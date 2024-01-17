export function getResponsiveNavData<T extends { title: string }>(
  menuData: T[],
  limit: { md: number; lg: number; xl: number }
): {
  responsiveMenuData: Array<T & { xl: boolean; lg: boolean; md: boolean }>;
  showMoreMD: boolean;
  showMoreLG: boolean;
  showMoreXL: boolean;
} {
  let charWidth = 0;
  let showMoreMD = false;
  let showMoreLG = false;
  let showMoreXL = false;

  const { md, lg, xl } = limit;

  const responsiveMenuData = menuData.map(data => {
    const length = data.title.length;
    const copiedData = {
      ...data,
      xl: length * 10 + charWidth > xl,
      lg: length * 10 + charWidth > lg,
      md: length * 10 + charWidth > md
    };
    charWidth += length * 10 + 32;
    return copiedData;
  });

  showMoreMD = charWidth > md;
  showMoreLG = charWidth > lg;
  showMoreXL = charWidth > xl;

  return { responsiveMenuData, showMoreMD, showMoreLG, showMoreXL };
}
