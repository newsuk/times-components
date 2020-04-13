export interface TypographySettings {
  lineHeight?: number;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: 'italic' | 'normal';
  fontWeight?: 'bold' | 'normal';
}

export interface LinkTag {
  tag: 'LINK';
  href: string;
}

export interface FontTag {
  tag: 'FONT';
  settings: TypographySettings;
}

export type AttributeTag = LinkTag | FontTag;

export function isFontTag(value: AttributeTag | null): value is FontTag {
  return value !== null && value !== undefined && value.tag === 'FONT';
}

export function isLinkTag(value: AttributeTag | null): value is LinkTag {
  return value !== null && value !== undefined && value.tag === 'LINK';
}

export default class AttributedString {
  public static concat(
    string1: AttributedString,
    string2: AttributedString
  ): AttributedString {
    const newString = new AttributedString(
      string1.string + string2.string,
      string1.attributes.concat(string2.attributes)
    );
    return newString;
  }
  public static join(strings: AttributedString[]): AttributedString {
    if (strings.length === 0) {
      return new AttributedString('', []);
    }
    return strings.reduce(AttributedString.concat);
  }

  public string: string = '';
  public attributes: AttributeTag[][] = [];
  public length: number;
  public parent?: AttributedString;

  constructor(str: string, attributes: AttributeTag[][]) {
    this.string = str;
    this.attributes = attributes;
    this.length = str.length;
  }

  public charAt(index: number): string {
    return this.string.charAt(index);
  }

  public getTagsForIndex(index: number): AttributeTag[] {
    return this.attributes[index] || [];
  }

  public addAttribute(start: number, end: number, tag: AttributeTag) {
    for (let i = start; i < end; i++) {
      this.attributes[i].push(tag);
    }
  }

  public split = (chars: string[] = [' ', '\n']) => {
    const attrs = this.attributes;
    let start = 0;
    const chunks: AttributedString[] = [];
    attrs: for (let i = 0; i < attrs.length; i++) {
      const attrSet = attrs[i];
      for (let j = 0; j < attrSet.length; j++) {
        if (chars.includes(this.string[i])) {
          chunks.push(this.slice(start, start + 1));
          chunks.push(this.slice(start + 1, i));
          start = i;
          continue attrs;
        }
      }
    }
    if (start !== this.string.length) {
      chunks.push(this.slice(start, start + 1));
      chunks.push(this.slice(start + 1, this.string.length));
    }
    return chunks;
  };

  public collapsedAttributes(index: number): AttributeTag[] {
    const tags = this.getTagsForIndex(index);
    const fontAttrs = tags.filter(isFontTag).map(f => f.settings);
    const linkAttrs = tags.filter(isLinkTag);
    const attr = fontAttrs.reduce((acc, v) => ({ ...acc, ...v }), {});
    return [{ tag: 'FONT', settings: attr }, linkAttrs[0] || null];
  }

  public slice(begin: number, end?: number): AttributedString {
    if (end === undefined) {
      return this.slice(begin, this.string.length);
    }
    return new AttributedString(
      this.string.slice(begin, end),
      this.attributes.slice(begin, end)
    );
  }
}
