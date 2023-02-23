import themeDefault from './typography-presets.json';

export const typographyPresets = Object.fromEntries(
  Object.entries({
    ...themeDefault,
    newPreset010: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '500',
      fontSize: '{{fonts.fontSize020}}',
      lineHeight: '16px',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    editorialHeadline035: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight030}}',
      fontSize: '{{fonts.fontSize060}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    editorialHeadline082: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight030}}',
      fontSize: '{{fonts.fontSize112}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    editorialHeadline085: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight030}}',
      fontSize: '{{fonts.fontSize115}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    editorialHeadline087: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight030}}',
      fontSize: '{{fonts.fontSize117}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    sectionHeader010: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight040}}',
      fontSize: '{{fonts.newFontSize020}}',
      lineHeight: '{{fonts.newFontLineHeight010}}',
      letterSpacing: '{{fonts.fontLetterSpacing020}}',
      fontStretch: 'normal',
      textAlign: 'center'
    },
    mastheadTime: {
      fontFamily: '{{fonts.fontFamily030}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight010}}',
      lineHeight: '{{fonts.newFontLineHeight010}}',
      letterSpacing: '{{fonts.fontLetterSpacing020}}',
      fontStretch: 'normal',
      textAlign: 'center'
    }
  }).map(([key, value]) => {
    if (
      [
        'editorialHeadline010',
        'editorialHeadline030',
        'editorialHeadline060',
        'editorialHeadline070',
        'editorialHeadline080',
        'sectionHeader010',
        'mastheadTime'
      ].includes(key)
    ) {
      value.lineHeight = '{{fonts.fontLineHeight030}}';
    }

    return [key, value];
  })
);
