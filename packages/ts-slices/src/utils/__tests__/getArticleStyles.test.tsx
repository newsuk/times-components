import {
  setDisplaySchema,
  getImageRatioSchema,
  isSideBySide,
  isImageHidden,
  calculateSlotWidth
} from '../getArticleStyles';

const imageRatioSchema = {
  sm: { imageRatio: '3:2' },
  md: { imageRatio: '3:2' },
  lg: { imageRatio: '3:2' },
  xlg: { imageRatio: '3:2' }
};

const sideBySideSchema = {
  sm: {},
  md: {},
  lg: { isSideBySide: true },
  xlg: { isSideBySide: true }
};

const imageHiddenSchema = {
  sm: {},
  md: {},
  lg: { isImageHidden: true },
  xlg: { isImageHidden: true }
};

describe('getArticleStyles :: setDisplaySchema', () => {
  it('should return a display schema with all breakpoints', () => {
    const schema = setDisplaySchema({ sm: { imageRatio: '3:2' } });
    expect(schema).toStrictEqual(imageRatioSchema);
  });

  it('should return a display schema with empty breakpoints', () => {
    const schema = setDisplaySchema({ lg: { isSideBySide: true } });
    expect(schema).toStrictEqual(sideBySideSchema);
  });
});

describe('getArticleStyles :: getImageRatioSchema', () => {
  it('should return correct breakpoints by image ratio', () => {
    const schema = getImageRatioSchema(imageRatioSchema);
    expect(schema).toStrictEqual({
      '3:2': ['sm', 'md', 'lg', 'xlg']
    });
  });

  it('should return correct breakpoints with multiple image ratios', () => {
    const schema = getImageRatioSchema({
      sm: { imageRatio: '3:2' },
      md: { imageRatio: '3:2' },
      lg: { imageRatio: '16:9' },
      xlg: { imageRatio: '16:9' }
    });
    expect(schema).toStrictEqual({
      '3:2': ['sm', 'md'],
      '16:9': ['lg', 'xlg']
    });
  });
});

describe('getArticleStyles :: isSideBySide', () => {
  it('should return true when isSideBySide set for given breakpoint', () => {
    expect(isSideBySide('lg', sideBySideSchema)).toBeTruthy();
  });

  it('should return false when isSideBySide not set for given breakpoint', () => {
    expect(isSideBySide('sm', sideBySideSchema)).toBeFalsy();
  });
});

describe('getArticleStyles :: isImageHidden', () => {
  it('should return true when isImageHidden set for given breakpoint', () => {
    expect(isImageHidden('lg', imageHiddenSchema)).toBeTruthy();
  });

  it('should return false when isImageHidden not set for given breakpoint', () => {
    expect(isImageHidden('sm', imageHiddenSchema)).toBeFalsy();
  });
});

describe('getArticleStyles :: calculateSlotWidth', () => {
  it('should return the correct css width value', () => {
    expect(calculateSlotWidth(50, 2)).toBe('calc(50% - 12px)');
    expect(calculateSlotWidth(33.33, 3)).toBe('calc(33.33% - 16px)');
    expect(calculateSlotWidth(25, 4)).toBe('calc(25% - 18px)');
  });
});
