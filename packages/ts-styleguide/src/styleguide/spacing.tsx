const spacingBase = 5;

const spacing = (multiple: number) => {
  return spacingBase * multiple;
};

const globalSpacingStyles = {
  tabletHeadline: {
    marginBottom: spacingBase * 1
  },
  tabletTeaser: {
    marginTop: spacingBase * 1
  }
};

export default (multiple: number) => {
  return `${spacing(multiple)}px`;
};
export { globalSpacingStyles };
