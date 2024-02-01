export const getResponsiveNavData = <T extends { title: string }>(
  menuData: T[],
  limit: { md: number; lg?: number; xl?: number; xxl?: number },
  padding = 16,
  variable = 10
): {
  responsiveMenuData: Array<
    T & { xxl?: boolean; xl?: boolean; lg?: boolean; md: boolean }
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
    const addingWidth = length * variable + padding * 2;

    const copiedData = {
      ...data,
      ...(xxl !== undefined ? { xxl: addingWidth + charWidth > xxl } : {}),
      ...(xl !== undefined ? { xl: addingWidth + charWidth > xl } : {}),
      ...(lg !== undefined ? { lg: addingWidth + charWidth > lg } : {}),
      md: addingWidth + charWidth > md
    };
    charWidth += addingWidth;

    return copiedData;
  });

  if (xxl !== undefined) {
    showMoreXXL = charWidth > xxl;
  }
  if (xl !== undefined) {
    showMoreXXL = charWidth > xl;
  }
  if (lg !== undefined) {
    showMoreXXL = charWidth > lg;
  }
  showMoreMD = charWidth > md;

  return {
    responsiveMenuData,
    showMoreMD,
    showMoreLG,
    showMoreXL,
    showMoreXXL,
    charWidth
  };
};
