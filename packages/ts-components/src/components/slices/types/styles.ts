type SchemaBreakpoint = {
  isSideBySide?: boolean;
  sideBySideWidth?: string;
  sideBySidePadding?: number;
  isImageHidden?: boolean;
  imageRatio?: string;
  isCentered?: boolean;
  headlineFontSize?: number;
  backgroundColor?: string;
};

export type DisplaySchema = {
  sm?: SchemaBreakpoint;
  md?: SchemaBreakpoint;
  lg?: SchemaBreakpoint;
  xlg?: SchemaBreakpoint;
};

export type SliceStyle = {
  removePadding?: boolean;
  lineColor?: string;
};
