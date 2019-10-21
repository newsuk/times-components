import {
  breakLines,
  createHyphenator,
  positionItems,
  TexItem
} from 'tex-linebreak';
import AttributedString, { AttributeTag, FontTag } from './AttributedString';
import { Exclusion } from './Exclusion';
import FontStorage from './FontStorage';
import PositionedItem from './PositionedItem';
import Span from './Span';
import TextContainer from './TextContainer';

function isFontTag(value: AttributeTag | null): value is FontTag {
  return value !== null && value !== undefined;
}

const getLeading = (str: AttributedString) => {
  const fontAttrs: FontTag[] = str.attributes
    .map(({ tag }) => tag)
    .filter(isFontTag);
  return Math.max(...fontAttrs.map(tag => tag.settings.lineHeight));
};

const getSettings = (str: AttributedString) => {
  const fontAttrs: FontTag[] = str.attributes
    .map(({ tag }) => tag)
    .filter(isFontTag);
  if (!fontAttrs.length) {
    throw new Error(`String with no font setting: ${str.string}`);
  }
  return fontAttrs[0].settings;
};

const MAX_COST = 1000;
const MIN_COST = -1000;

function forcedBreak(): TexItem {
  return {
    cost: MIN_COST,
    flagged: false,
    text: new AttributedString('', []),
    type: 'penalty',
    width: 0
  };
}

const defaultOptions = {
  adjacentLooseTightPenalty: 0,
  doubleHyphenPenalty: 0,
  initialMaxAdjustmentRatio: 1,
  maxAdjustmentRatio: Infinity
};

function layoutItemsFromString(
  s: AttributedString,
  measureFn: (word: AttributedString) => number,
  hyphenateFn?: (word: AttributedString) => AttributedString[]
): TexItem[] {
  const items: TexItem[] = [];
  const splits = s.split().filter(w => w.length > 0);

  const spaceWidth = measureFn(new AttributedString(' ', []));
  const hyphenWidth = measureFn(new AttributedString('-', []));
  const isSpace = (word: AttributedString) => /\s/.test(word.charAt(0));

  // TODO: this is set up for ragged right
  // Justify is the below shrink + stretch spaceWidth * 1.5
  // const shrink = Math.max(0, spaceWidth - 2);
  splits.forEach(w => {
    if (isSpace(w)) {
      if (w.string === '\n') {
        items.push({
          shrink: 0,
          stretch: MAX_COST,
          text: new AttributedString('', []),
          type: 'glue',
          width: 0
        });
        items.push(forcedBreak());
        return;
      }
      const g: TexItem = {
        shrink: 0,
        stretch: spaceWidth / 3,
        text: w,
        type: 'glue',
        width: spaceWidth
      };
      items.push(g);
      return;
    }

    if (hyphenateFn) {
      const chunks = hyphenateFn(w);
      chunks.forEach((c, i) => {
        const b: TexItem = { type: 'box', width: measureFn(c), text: c };
        items.push(b);
        if (i < chunks.length - 1) {
          const hyphen: TexItem = {
            cost: 10,
            flagged: true,
            text: new AttributedString('-', c.attributes),
            type: 'penalty',
            width: hyphenWidth
          };
          items.push(hyphen);
        }
      });
    } else {
      const b: TexItem = { type: 'box', width: measureFn(w), text: w };
      items.push(b);
    }
  });
  items.push({
    shrink: 0,
    stretch: MAX_COST,
    text: new AttributedString('', []),
    type: 'glue',
    width: 0
  });
  items.push(forcedBreak());

  return items;
}

const joinAdjacent = (positioned: PositionedItem[]): PositionedItem[] => {
  const reduced = positioned.reduce(
    (acc: PositionedItem[], p: PositionedItem) => {
      const last = acc[acc.length - 1];
      if (!last) {
        return [...acc, p];
      }
      if (p.position.xOffset === last.position.xOffset + last.position.width) {
        const joined = AttributedString.join([last.text.text, p.text.text]);
        joined.parent = last.text.text.parent;
        return [
          ...acc.slice(0, -1),
          new PositionedItem(
            // tslint:disable-next-line: no-object-literal-type-assertion
            {
              text: joined
            } as TexItem,
            {
              ...last.position,
              width: last.position.width + p.position.width
            }
          )
        ];
      }
      return [...acc, p];
    },
    []
  );
  return reduced;
};

const raggedRight = (positioned: PositionedItem[], spaceWidth: number) => {
  for (let i = 0; i < positioned.length; i++) {
    const current = positioned[i];
    const next = positioned[i + 1];
    if (!next) {
      break;
    }
    if (
      (current.text.text.parent &&
        current.text.text.parent === next.text.text.parent &&
        current.position.line === next.position.line) ||
      next.text.text.string === '-'
    ) {
      next.position.xOffset = current.position.xOffset + current.position.width;
      continue;
    }
    if (next.position.xOffset === 0) {
      continue;
    }
    if (
      next.position.xOffset -
        current.position.xOffset -
        current.position.width >
      spaceWidth
    ) {
      next.position.xOffset =
        current.position.xOffset + current.position.width + spaceWidth;
    }
  }
  return joinAdjacent(positioned);
};

const makeHyphenator = (() => {
  let dictionary: any = null;
  return () => {
    if (!dictionary) {
      dictionary = createHyphenator(require('hyphenation.en-gb'));
    }
    return dictionary;
  };
})();

export default class LayoutManager {
  public text: AttributedString;
  public containers: TextContainer[] = [];
  public positioned: PositionedItem[] = [];
  public exclusions: Exclusion[] = [];
  public processed: number = 0;

  constructor(
    text: AttributedString,
    containers: TextContainer[],
    exclusions: Exclusion[] = []
  ) {
    this.text = text;
    this.containers = containers;
    this.exclusions = exclusions;
  }

  public layout(
    justify: boolean = false,
    hyphenate: boolean = false
  ): PositionedItem[] {
    let spans: Span[] = [];
    let hyphenator: any;
    if (hyphenate) {
      hyphenator = makeHyphenator();
    }
    const leading = getLeading(this.text);
    for (const container of this.containers) {
      for (const exclusion of this.exclusions) {
        container.addExclusion(exclusion.move(-container.x, -container.y));
      }
      spans = spans.concat(container.calculateSpans(leading));
    }
    const measure = (text: AttributedString) => {
      const settings = getSettings(text.attributes.length ? text : this.text);
      const font = FontStorage.getFont(settings);
      return font.getAdvanceWidth(text.string, settings.fontSize);
    };
    const hyphenateFn = (text: AttributedString) => {
      const chunks = hyphenator(text.string);
      const stringies: AttributedString[] = [];
      let i = 0;
      for (const chunk of chunks) {
        const slice = text.slice(i, i + chunk.length);
        slice.parent = text;
        // TODO: use rope datastructure here to reduce memory pressure
        stringies.push(slice);
        i += chunk.length;
      }
      return stringies;
    };
    const items = layoutItemsFromString(
      this.text,
      measure,
      hyphenate ? hyphenateFn : undefined
    );
    const widths = spans.map((span: Span) => span.end.x - span.start.x);
    const breakpoints = breakLines(items, widths, defaultOptions);
    const positioned = positionItems(items, widths, breakpoints);
    const spaceWidth = measure(new AttributedString(' ', []));
    this.processed = positioned
      .filter(p => !isNaN(p.xOffset))
      .map(p => items[p.item].text)
      .reduce((acc, t) => acc + t.length, 0);
    this.positioned = positioned
      .filter(p => !isNaN(p.xOffset) && spans[p.line])
      .map(p => {
        const item = new PositionedItem(items[p.item], {
          ...p,
          xOffset: spans[p.line].start.x + p.xOffset
        });
        return item;
      });
    if (!justify) {
      raggedRight(this.positioned, spaceWidth);
    }
    return this.positioned;
  }
}
