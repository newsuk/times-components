import AttributedString, { AttributeTag, FontTag } from './AttributedString';
import { Exclusion } from './Exclusion';
import FontStorage from './FontStorage';
import Point from './Point';
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

interface MeasuredItem {
  width: number;
  text: AttributedString;
}

function* layoutItemsFromString(
  s: AttributedString,
  measureFn: (word: AttributedString) => number
): Generator<MeasuredItem> {
  const splits = s.split().filter(w => w.length > 0);

  const spaceWidth = measureFn(new AttributedString(' ', []));
  const isSpace = (word: AttributedString) => /\s/.test(word.charAt(0));

  for (const split of splits) {
    if (isSpace(split)) {
      if (split.string === '\n') {
        yield {
          text: new AttributedString('\n', []),
          width: 0
        };
        continue;
      } else {
        yield {
          text: new AttributedString(' ', []),
          width: spaceWidth
        };
        continue;
      }
    }

    yield {
      text: split,
      width: measureFn(split)
    };
  }
}

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
    this.measure = this.measure.bind(this);
  }

  public layout = function*(this: LayoutManager): Generator<PositionedItem> {
    const leading = getLeading(this.text);
    for (const container of this.containers) {
      for (const exclusion of this.exclusions) {
        container.addExclusion(exclusion.move(-container.x, -container.y));
      }
    }
    const spans = this.concatSpans(leading);
    const items = layoutItemsFromString(this.text, this.measure);

    let item: MeasuredItem | undefined;
    spans: for (const span of spans) {
      let x = span.start.x;
      const end = span.end.x;
      while (x < end) {
        // handle orphans
        if (item && item.text.string !== ' ' && item.width + x <= end) {
          const positioned: PositionedItem = {
            position: new Point(x, span.end.y),
            text: item.text
          };
          yield positioned;
          x += item.width;
          item = undefined;
        }
        // proceed as normal
        for (item of items) {
          if (x === span.start.x && item.text.string === ' ') {
            continue;
          }
          if (x + item.width <= end) {
            if (item.text.string !== ' ') {
              const positioned: PositionedItem = {
                position: new Point(x, span.end.y),
                text: item.text
              };
              yield positioned;
            }
            x += item.width;
          } else {
            continue spans;
          }
        }
        break spans;
      }
    }
  };

  private concatSpans = function*(
    this: LayoutManager,
    leading: number
  ): Generator<Span> {
    for (const container of this.containers) {
      yield* container.calculateSpans(leading);
    }
  };

  private measure(text: AttributedString): number {
    const settings = getSettings(text.attributes.length ? text : this.text);
    const font = FontStorage.getFont(settings);
    return font.getAdvanceWidth(text.string, settings.fontSize);
  }
}
