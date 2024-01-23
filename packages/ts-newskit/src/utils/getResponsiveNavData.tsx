export const getResponsiveNavData = <T extends { title: string }>(
  menuData: T[],
  limit: { md: number; lg: number; xl: number; xxl?: number }
): {
  responsiveMenuData: Array<
    T & { xxl?: boolean; xl: boolean; lg: boolean; md: boolean }
  >;
  showMoreMD: boolean;
  showMoreLG: boolean;
  showMoreXL: boolean;
  showMoreXXL: boolean;
  charWidth: number;
} => {
  let charWidth = 0;
  let showMoreMD = false;
  let showMoreLG = false;
  let showMoreXL = false;
  let showMoreXXL = false;

  const { md, lg, xl, xxl } = limit;

  const responsiveMenuData = menuData.map(data => {
    const length = data.title.length;
    const addingWidth = length * 10 + 32;
    const copiedData = {
      ...data,
      ...(xxl !== undefined ? { xxl: addingWidth + charWidth > xxl } : {}),
      xl: addingWidth + charWidth > xl,
      lg: addingWidth + charWidth > lg,
      md: addingWidth + charWidth > md
    };
    charWidth += addingWidth;
    return copiedData;
  });

  if (xxl !== undefined) {
    showMoreXXL = charWidth > xxl;
  }
  showMoreMD = charWidth > md;
  showMoreLG = charWidth > lg;
  showMoreXL = charWidth > xl;

  return {
    responsiveMenuData,
    showMoreMD,
    showMoreLG,
    showMoreXL,
    showMoreXXL,
    charWidth
  };
};
