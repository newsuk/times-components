type Line = ['L', number, number];
type Cubic = ['C', number, number];
type Quadratic = ['Q', number, number, number, number];

declare module 'parse-svg-path' {
  export default function(path: string): SimplePath;

  type SimpleSegment = Line | Cubic | Quadratic;
  type SimplePath = SimpleSegment[];
}

declare module '@times-components/test-utils' {
  export const TestFont: any;
}

declare module 'abs-svg-path' {
  export default function(path: SimplePath): SimplePath;

  type SimpleSegment = Line | Cubic | Quadratic;
  type SimplePath = SimpleSegment[];
}

declare module 'simplify-geometry' {
  export default function(
    path: number[][],
    tolerance: number
  ): Array<[number, number]>;
}

declare module 'tex-linebreak' {
  export type Font = any;
  export interface TypographySettings {
    leading: number;
    size: number;
    font: Font;
  }

  interface LinkTag {
    tag: 'LINK';
    href: string;
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

  export interface StringLike {
    length: number;
    string: string;
    attributes: Attribute[];
    slice(start: number, end?: number): StringLike;
    split(pattern: RegExp): StringLike[];
    charAt(index: number): string;
  }

  export interface TexItem {
    type: 'glue' | 'box' | 'penalty';
    width: number;
    shrink?: number;
    stretch?: number;
    text: any;
    cost?: number;
    flagged?: boolean;
  }
  export interface LayoutItem {
    item: number;
    line: number;
    xOffset: number;
    width: number;
  }
  export type BreakPoint = number;

  export interface Options {
    maxAdjustmentRatio: number | null;
    initialMaxAdjustmentRatio: number;
    doubleHyphenPenalty: number;
    adjacentLooseTightPenalty: number;
  }

  export type Hyphenator = (word: StringLike) => StringLike[];
  export function layoutItemsFromString(
    text: string | StringLike,
    measure: (word: StringLike) => number,
    hyphenate?: Hyphenator
  ): TexItem[];
  export function breakLines(
    items: TexItem[],
    width: number | number[],
    options?: Options
  ): BreakPoint[];
  export function positionItems(
    items: TexItem[],
    width: number | number[],
    breaks: BreakPoint[]
  ): LayoutItem[];
  export function createHyphenator(dict: any): any;
}

declare module 'hyphenation.en-gb' {
  export default function(): any;
}

declare module 'opentype.js' {
  export interface Bounds {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  export interface Glyph {
    getBoundingBox(): Bounds;
  }

  export interface Path {
    getBoundingBox(): Bounds;
  }

  export interface Font {
    getAdvanceWidth(text: string, size: number): number;
    stringToGlyphs(text: string): Glyph[];
    getPath(text: string, x: number, y: number, fontSize: number): Path;
  }
  export function loadSync(path: string): Font;
}
