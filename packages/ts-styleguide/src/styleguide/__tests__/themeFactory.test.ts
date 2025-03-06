import '@testing-library/react';
import themeFactory from '../themeFactory';

describe('themeFactory()', () => {
  it('should return correct theme when section nor template is provided', () => {
    expect(themeFactory()).toEqual({
      dropCapFont: 'dropCap',
      headlineCase: null,
      headlineFont: 'headline',
      pullQuoteFont: 'headlineRegular',
      sectionColour: '#1D1D1B'
    });
  });

  it('should return correct theme for an indepth style page', () => {
    expect(themeFactory('Style', 'indepth')).toEqual({
      dropCapFont: 'styleMagazine',
      headlineFont: 'styleMagazine',
      pullQuoteFont: 'styleMagazine',
      sectionColour: undefined,
      headlineCase: 'none'
    });
  });

  it('should return correct theme for a maincomment style page', () => {
    expect(themeFactory('Style', 'maincomment')).toEqual({
      dropCapFont: 'dropCap',
      headlineFont: 'headline',
      pullQuoteFont: 'headlineRegular',
      sectionColour: '#BC3385',
      headlineCase: null
    });
  });

  it('should return correct theme for an indepth cultureMagazine page', () => {
    expect(themeFactory('culture', 'indepth')).toEqual({
      dropCapFont: 'cultureMagazine',
      headlineFont: 'cultureMagazine',
      pullQuoteFont: 'cultureMagazine',
      sectionColour: undefined,
      headlineCase: null
    });
  });
});
