import { Theme, ThemeBase } from 'newskit';
import { addOverride, updateThemeTypography } from '../theme-formatting';
// @ts-ignore
import TheTimesLight from '@newskit-themes/the-times/TheTimes-light.json';

describe('updateThemeTypography function', () => {
  test('typographyPreset fontSize is updated if it has a rem value', () => {
    expect(TheTimesLight.typographyPresets.editorialDisplay001.fontSize).toBe(
      '1rem'
    );

    const updatedTheme = updateThemeTypography(
      (TheTimesLight as unknown) as Theme
    );
    expect(updatedTheme.typographyPresets.editorialDisplay001.fontSize).toBe(
      '1.6rem'
    );
  });

  test('typographyPreset fontSize is NOT updated if it does not a rem value', () => {
    const testPreset = {
      fontFamily: 'Times Modern',
      fontWeight: 800,
      lineHeight: 1.125,
      fontSize: '10px',
      letterSpacing: '0em'
    };

    ((TheTimesLight as unknown) as Theme).typographyPresets.testPreset = testPreset;

    const updatedTheme = updateThemeTypography(
      (TheTimesLight as unknown) as Theme
    );
    expect(updatedTheme.typographyPresets.testPreset.fontSize).toBe(
      ((TheTimesLight as unknown) as Theme).typographyPresets.testPreset
        .fontSize
    );
  });
});

describe('addOverride function', () => {
  const stylePresets = {
    breadcrumbSeparator: {
      base: {
        color: '{{colors.inkNonEssential}}'
      }
    }
  };

  test('theme does NOT contain any overrides', () => {
    expect(TheTimesLight).not.toEqual(expect.objectContaining(stylePresets));
  });

  test('theme does contain added style preset overrides', () => {
    const updatedThemeWithOverride = addOverride(
      (TheTimesLight as unknown) as Theme,
      (stylePresets as unknown) as ThemeBase
    );

    expect(updatedThemeWithOverride).toEqual(
      expect.objectContaining(stylePresets)
    );
  });
});
