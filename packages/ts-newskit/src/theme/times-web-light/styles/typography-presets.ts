import themeDefault from './typography-presets.json';

export const typographyPresets = Object.fromEntries(
  Object.entries({
    ...themeDefault,
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
    }
  }).map(([key, value]) => {
    if (
      [
        'editorialHeadline010',
        'editorialHeadline030',
        'editorialHeadline060',
        'editorialHeadline070',
        'editorialHeadline080'
      ].includes(key)
    ) {
      value.lineHeight = '{{fonts.fontLineHeight030}}';
    }

    return [key, value];
  })
);
