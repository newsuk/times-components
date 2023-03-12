export const secondaryNavigationStylePresets = {
  subMenu: {
    base: {
      borderRadius: '{{sizing.sizing010}}',
      backgroundColor: '{{colors.white}}',
      height: '{{sizing.sizing060}}',
      width: '87px !important',
      marginTop: '{{sizing.sizing020}}',
      marginRight: '{{sizing.sizing040}}',
      minHeight: '30px',
      padding: '{{sizing.sizing030}}'
    }
  },
  menuItemDesktop: {
    base: {
      color: '#1D1D1B',
      backgroundColor: '{{colors.white}}',
      padding: '10px 0',
      minWidth: 'max-content',
      borderBottom: '4px solid transparent',
      display: 'flex'
    },
    hover: {
      borderBottom: '4px solid #01000D'
    },
    selected: {
      borderBottom: '4px solid #01000D'
    }
  },

  secondaryMenuItem: {
    base: {
      color: '#1D1D1B',
      fontFamily: 'Roboto-Medium',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '{{fonts.fontSize030}}',
      lineHeight: '{{fonts.fontLineHeight070}}',
      padding: '{{sizing.sizing030}} {{sizing.sizing060}}',
      marginTop: '-2px',
      borderBottom: '1px solid #E4E4E4',
      marginBottom: '-8px'
    },
    hover: {
      marginTop: '-2px',
      backgroundColor: '{{colors.neutral010}}',
      borderBottom: '1px solid #F5F5F5'
    }
  },
  icon: {
    base: {
      position: 'absolute',
      right: '25px',
      height: '{{sizing.sizing040}}',
      width: '{{sizing.sizing040}}'
    }
  },

  textBlock: {
    base: {
      marginTop: '{{sizing.sizing040}}',
      paddingLeft: '6px'
    }
  },
  menuBlock: {
    base: {
      height: '{{sizing.sizing080}}',
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '10px',
      backgroundColor: '{{colors.neutral010}}'
    }
  },
  subMenuItems: {
    base: {
      color: '#1D1D1B'
    }
  },

  menuItemMore: {
    base: {
      color: '#1D1D1B'
    }
  },
  subMenuPreset1: {
    base: {
      minWidth: '100px',
      color: '#1D1D1B',
      backgroundColor: '{{colors.white}}',
      padding:
        '{{sizing.sizing020}} {{sizing.sizing040}} {{sizing.sizing030}} {{sizing.sizing040}}'
    },
    hover: {
      backgroundColor: '{{colors.neutral010}}'
    }
  },
  subMenuPreset2: {
    base: {
      minWidth: '100px',
      color: '#1D1D1B',
      backgroundColor: '{{colors.neutral010}}',
      padding:
        '{{sizing.sizing020}} {{sizing.sizing040}} {{sizing.sizing030}} {{sizing.sizing040}}'
    }
  }
};
