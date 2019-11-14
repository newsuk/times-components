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

export interface MeasuredItem {
  width: number;
  text: AttributedString;
}

function layoutItemsFromString(
  s: AttributedString,
  measureFn: (word: AttributedString) => number
): MeasuredItem[] {
  const splits = s.split().filter(w => w.length > 0);

  const spaceWidth = measureFn(new AttributedString(' ', []));
  const isSpace = (word: AttributedString) => /\s/.test(word.charAt(0));

  const items = [];

  for (const split of splits) {
    if (isSpace(split)) {
      if (split.string === '\n') {
        items.push({
          text: new AttributedString('\n', []),
          width: 0
        });
        continue;
      } else {
        items.push({
          text: new AttributedString(' ', []),
          width: spaceWidth
        });
        continue;
      }
    }

    items.push({
      text: split,
      width: measureFn(split)
    });
  }

  return items;
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

  public layout = function(this: LayoutManager): PositionedItem[] {
    const leading = getLeading(this.text);

    for (const childContainer of this.containers) {
      for (const exclusion of this.exclusions) {
        childContainer.addExclusion(
          exclusion.move(-childContainer.x, -childContainer.y)
        );
      }
    }

    const items = layoutItemsFromString(this.text, this.measure);
    const result: PositionedItem[] = [];
    const containers = this.containers.slice();

    let container: TextContainer | undefined;
    let span: Span | false | undefined;
    let item: MeasuredItem | undefined;

    while (items.length || item) {
      if (!container) {
        container = containers.shift();
        if (!container) {
          break;
        }
      }
      if (!span) {
        span = container.nextSpan(leading);
        if (!span) {
          container = undefined;
          continue;
        }
      }
      if (!item) {
        item = items.shift();
        if (!item) {
          break;
        }
      }
      if (span.end.x - span.start.x >= item.width) {
        if (item.text.string !== ' ') {
          result.push({
            position: new Point(span.start.x, span.end.y),
            text: item.text
          });
        }
        span.start.x += item.width;
        item = undefined;
      } else {
        span = undefined;
        if (item.text.string === ' ') {
          item = undefined;
        }
      }
    }

    return result;
  };

  private measure(text: AttributedString): number {
    const settings = getSettings(text.attributes.length ? text : this.text);
    const font = FontStorage.getFont(settings);
    return font.getAdvanceWidth(text.string, settings.fontSize);
  }
}
