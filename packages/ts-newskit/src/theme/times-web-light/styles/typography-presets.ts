import themeDefault from './typography-presets.json';

export const typographyPresets = Object.fromEntries(
  Object.entries({
    ...themeDefault,
    newPreset010: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '{{fonts.fontSize020}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    topNav010: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '{{fonts.fontSize020}}',
      lineHeight: '{{fonts.fontLineHeight010}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal',
      whiteSpace: 'nowrap'
    },
    newPreset020: {
      fontFamily: '{{fonts.fontFamily030.fontFamily}}',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '{{fonts.newFontSize1}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset030: {
      fontFamily: '{{fonts.newFontFamily.fontFamily}}',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '{{fonts.newFontSize010}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset040: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '15px',
      lineHeight: '{{fonts.fontLineHeight070}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset050: {
      fontFamily: '{{fonts.newFontFamily.fontFamily}}',
      fontWeight: '{{fonts.fontWeight010}}',
      fontSize: '{{fonts.fontSize020}}',
      lineHeight: '{{fonts.fontLineHeight030}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset060: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight040}}',
      fontSize: '{{fonts.fontSize080}}',
      lineHeight: '{{fonts.fontLineHeight040}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset070: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontWeight: '{{fonts.fontWeight040}}',
      fontSize: '{{fonts.fontSize060}}',
      lineHeight: '{{fonts.fontLineHeight110}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset080: {
      fontFamily: '{{fonts.fontFamily040.fontFamily}}',
      fontWeight: '{{fonts.fontWeight030}}',
      fontSize: '{{fonts.fontSize080}}',
      lineHeight: '{{fonts.fontLineHeight040}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset090: {
      fontFamily: '{{fonts.newFontFamily.fontFamily}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight030}}',
      lineHeight: '{{fonts.fontLineHeight050}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    newPreset100: {
      fontFamily: '{{fonts.fontFamily030.fontFamily}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight010}}',
      lineHeight: '{{fonts.fontLineHeight060}}',
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
      fontFamily: '{{fonts.fontFamily040.fontFamily}}',
      fontSize: '{{fonts.fontSize115}}',
      fontWeight: '{{fonts.fontWeight040}}',
      lineHeight: '{{fonts.fontLineHeight270}}',
      letterSpacing: '{{fonts.fontLetterSpacing020}}',
      fontStretch: 'normal',
      textAlign: 'center'
    },
    mastheadTime: {
      fontFamily: '{{fonts.fontFamily030.fontFamily}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight010}}',
      lineHeight: '{{fonts.fontLineHeight270}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    breadcrumbText: {
      fontFamily: '{{fonts.fontFamily030.fontFamily}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight020}}',
      lineHeight: '{{fonts.fontLineHeight070}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    articleListTitle: {
      fontFamily: '{{fonts.fontFamily010.fontFamily}}',
      fontSize: '{{fonts.fontSize040}}',
      fontWeight: '{{fonts.fontWeight010}}',
      lineHeight: '{{fonts.fontLineHeight080}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    articleListArticleType: {
      fontFamily: '{{fonts.fontFamily030.fontFamily}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight030}}',
      lineHeight: '{{fonts.fontLineHeight020}}',
      letterSpacing: '{{fonts.fontLetterSpacing010}}',
      fontStretch: 'normal'
    },
    articleListTimeToRead: {
      fontFamily: '{{fonts.fontFamily030.fontFamily}}',
      fontSize: '{{fonts.fontSize010}}',
      fontWeight: '{{fonts.fontWeight010}}',
      lineHeight: '{{fonts.fontLineHeight020}}',
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
