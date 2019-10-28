const spacingBase = 5;

export default function(multiple) {
  return spacingBase * multiple;
}

export const globalSpacingStyles = {
  tabletHeadline: {
    marginBottom: 0
  },
  tabletTeaser: {
    marginTop: spacingBase * 2
  }
};
