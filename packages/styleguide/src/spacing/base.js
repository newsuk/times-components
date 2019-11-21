const spacingBase = 5;

export default function(multiple) {
  return spacingBase * multiple;
}

export const globalSpacingStyles = {
  tabletHeadline: {
    marginBottom: spacingBase * 1
  },
  tabletTeaser: {
    marginTop: spacingBase * 1
  }
};
