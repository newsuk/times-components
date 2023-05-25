import { updateThemeTypography } from '../theme-formatting';
// @ts-ignore
import { TheTimesLight } from '@newskit-themes/the-times';

describe('updateThemeTypography function', () => {
  test('typographyPreset fontSize is updated if it has a rem value', () => {
    const updatedTheme = updateThemeTypography(TheTimesLight);
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

    TheTimesLight.typographyPresets.testPreset = testPreset;

    const updatedTheme = updateThemeTypography(TheTimesLight);
    expect(updatedTheme.typographyPresets.testPreset.fontSize).toBe(
      TheTimesLight.typographyPresets.testPreset.fontSize
    );
  });
});
