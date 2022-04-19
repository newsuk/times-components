const spacingBase = 5;

const spacing = function(multiple: any) {
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

export default function(multiple: any) {
  return `${spacing(multiple)}px`;
}
export { globalSpacingStyles };
