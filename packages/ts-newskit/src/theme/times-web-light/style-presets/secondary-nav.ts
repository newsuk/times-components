export const secondaryNavigationStylePresets = {
  subMenu: {
    base: {
      borderRadius: '{{sizing.sizing010}}',
      backgroundColor: '{{colors.white}}',
      height: '32px',
      width: '87px !important',
      marginTop: '8px',
      marginRight: '16px',
      iconSize: '16px',
      minHeight: '30px',
      padding: '12px 0 12px 12px'
    },
    hover: {
      borderRadius: '{{sizing.sizing010}}',
      backgroundColor: '{{colors.white}}',
      height: '32px',
      width: '87px !important',
      marginTop: '8px',
      marginRight: '16px',
      minHeight: '30px',
      padding: '12px 0 12px 12px'
    }
  },
  menuItemDesktop: {
    base: {
      color: '#1D1D1B',
      backgroundColor: '{{colors.white}}',
      padding: '12px 0',
      minWidth: 'max-content',
      borderBottom: '4px solid transparent'
    },
    hover: {
      borderBottom: '4px solid black'
    },
    selected: {
      borderBottom: '4px solid black'
    }
  },
  secondaryMenuItem: {
    base: {
      color: '#1D1D1B',
      fontFamily: 'Roboto-Medium',
      fontWeight: '{{fonts.fontWeight020}}',
      fontSize: '{{fonts.fontSize030}}',
      lineHeight: '{{fonts.fontLineHeight070}}',
      padding: '12px 32px'
    },
    hover: {
      backgroundColor: '{{colors.neutral010}}'
    }
  },
  icon: {
    base: {
      height: '16px',
      width: '16px'
    }
  },
  blockDefault: {
    base: {
      marginTop: '-2px'
    },
    hover: {
      marginTop: '-2px',

      backgroundColor: '{{colors.neutral010}}'
    }
  },
  textBlock: {
    base: {
      marginTop: '16px',
      paddingLeft: '6px'
    }
  },
  menuBlock: {
    base: {
      height: '48px',
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '10px',
      backgroundColor: '{{colors.neutral010}}'
    }
  }
};
