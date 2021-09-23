export enum Layout {
  Standard = '4043',
  Wide = '4042'
}

export const isStandard = (layoutSize: Layout) => {
  return layoutSize === Layout.Standard;
};

export const isWide = (layoutSize: Layout) => {
  return layoutSize === Layout.Wide;
};
