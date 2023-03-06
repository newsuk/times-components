export const navStylePresets = {
  topNavSearch: {
    base: {
      backgroundColor: '#222222',
      color: '{{colors.white}}',
    }
  },
  topNavSearchClear: {
    base: {
      color: '{{colors.inkSubtle}}',
      backgroundColor: 'transparent',
      minHeight: '{{sizing.sizing040}}',
      minWidth: '{{sizing.sizing040}}',
      transform: 'rotate(45deg)'
    }
  },
  buttonTopNav: {
    base: {
      backgroundColor: 'transparent',
    },
    hover: {
      backgroundColor: '#222222'
    }
  },
  buttonTopNavActive: {
    base: {
      backgroundColor: '#222222'
    }
  },
  menuLogo: {
    base: {
      color: '{{colors.white}}'
    }
  },
  menuItem: {
    base: {
      backgroundColor: 'transparent',
      color: '{{colors.white}}',
      iconColor: '{{colors.white}}',
      height: '60px',
      minWidth: 0
    },
    hover: {
      backgroundColor: '#222222'
    },
    selected: {
      backgroundColor: '#222222'
    }
  },
  menuItemScroll: {
    base: {
      color: '{{colors.interface060}}',
      borderBottom: '4px solid transparent',
      minWidth: 0,
      padding: '12px 0'
    },
    hover: {
      borderBottom: '4px solid black'
    },
    selected: {
      borderBottom: '4px solid black'
    }
  },
  moreSubMenu: {
    base: {
      justifyContent: 'end'
    }
  },
  subMenuItem: {
    base: {
      backgroundColor: '#222222',
      borderBottom: 'solid 1px #333333',
      color: '{{colors.white}}'
    },
    hover: {
      backgroundColor: '#333333'
    }
  },
  menuSubscribe: {
    base: {
      backgroundColor: '{{colors.interactivePrimary030}}',
      borderRadius: '{{sizing.sizing010}}',
      color: '{{colors.white}}'
    },
    hover: {
      backgroundColor: '{{colors.interactivePrimary040}}'
    }
  },
  menuScrollOverlay: {
    base: {
      backgroundImage: '{{overlays.overlayGradientInverseHorizontal}}'
    }
  },
  blockWrapper: {
    base: {
      backgroundColor: '#151515',
      color: '#828282',
      fontFamily: 'GillSansMTStd-Medium'
    }
  },
  searchBar: {
    base: {
      backgroundColor: '{{colors.interfaceNeutral010}}',
      color: '#9C9C9C',
      borderRadius: '{{sizing.sizing020}}',
      height: '40px'
    }
  }
};
