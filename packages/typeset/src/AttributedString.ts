export interface TypographySettings {
  lineHeight: number;
  fontSize: number;
  fontFamily: string;
  fontStyle: 'italic' | 'normal';
  fontWeight: 'bold' | 'normal';
}

interface LinkTag {
  tag: 'LINK';
  href: string;
  settings: TypographySettings;
}

export interface FontTag {
  tag: 'FONT';
  settings: TypographySettings;
}

export type AttributeTag = LinkTag | FontTag;

export interface Attribute {
  start: number;
  length: number;
  tag: AttributeTag;
}

export default class AttributedString {
  public static join(strings: AttributedString[]): AttributedString {
    const emptyString = new AttributedString('', []);
    return strings.reduce(
      (string1, string2) =>
        new AttributedString(
          string1.string + string2.string,
          string1.attributes.concat(
            string2.attributes.map(attr => ({
              ...attr,
              start: attr.start + string1.string.length
            }))
          )
        ),
      emptyString
    );
  }
  public string: string = '';
  public attributes: Attribute[] = [];
  public length: number;
  public parent?: AttributedString;

  constructor(str: string, attributes: Attribute[]) {
    this.string = str;
    this.attributes = attributes;
    this.length = str.length;
  }

  public charAt(index: number): string {
    return this.string.charAt(index);
  }

  public split = () => {
    const attrs: Attribute[] = this.attributes.slice();
    const strings = attrs.filter(attr => attr.length > 0).map(attr => {
      const slice = this.slice(attr.start, attr.start + attr.length);
      slice.attributes = slice.attributes.slice(0, 1); // TODO overlapping
      return slice;
    });
    const split = strings.map(substr => substr.splitWhitespace());
    const result = split.reduce((a, ss) => [...a, ...ss], []);
    return result;
  };

  public slice(begin: number, end?: number): AttributedString {
    if (end === undefined) {
      return this.slice(begin, this.string.length);
    }
    const str = this.string.slice(begin, end);
    const attrs = this.attributes
      .filter(attr => {
        const { start } = attr;
        if (begin >= start || start <= end) {
          return true;
        }
        return false;
      })
      .map(attr => {
        let { start, length } = attr;
        start -= begin;
        if (start < 0) {
          start = 0;
          length -= begin;
        }
        if (start + length > str.length - start) {
          length = str.length - start;
        }
        return {
          ...attr,
          length,
          start
        };
      });
    return new AttributedString(str, attrs.filter(({ length }) => length > 0));
  }

  private splitWhitespace(): AttributedString[] {
    const re = new RegExp(/ +/, 'g');
    const matches: AttributedString[] = [];
    let result;
    let i = 0;
    // tslint:disable-next-line: no-conditional-assignment
    while ((result = re.exec(this.string)) !== null) {
      const { index } = result;
      const slice = this.slice(i, index);
      matches.push(slice);
      matches.push(this.slice(index, re.lastIndex));
      i = re.lastIndex;
    }
    matches.push(this.slice(i));
    return matches.filter(({ length }) => length > 0);
  }
}
