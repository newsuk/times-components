const navSearch = {
  backgroundColor: '{{colors.interfaceNeutral010}}',
  color: '{{colors.white}}'
};

export const navStylePresets = {
  hamburgerSearch: {
    base: {
      ...navSearch,
      borderRadius: '{{sizing.sizing020}}'
    }
  },
  topNavSearch: {
    base: {
      ...navSearch
    }
  },
  searchClear: {
    base: {
      color: '{{colors.inkSubtle}}',
      backgroundColor: 'transparent'
    }
  },
  buttonTopNav: {
    base: {
      backgroundColor: 'transparent'
    },
    hover: {
      backgroundColor: '#222222'
    }
  },
  buttonTopNavActive: {
    base: {
      backgroundColor: '{{colors.interfaceNeutral010}}'
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
      iconColor: '{{colors.white}}'
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
      borderBottom: '4px solid transparent'
    },
    hover: {
      borderBottom: '4px solid {{colors.black}}'
    },
    selected: {
      borderBottom: '4px solid {{colors.black}}'
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
      borderBottom: 'solid 1px {{colors.neutral080}}',
      color: '{{colors.white}}'
    },
    hover: {
      backgroundColor: '{{colors.interfaceNeutral010}}'
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
      backgroundImage: '{{overlays.overlayGradientBaseHorizontal}}'
    }
  },
  transparentBackground: {
    base: {
      backgroundImage: 'transparent'
    }
  }
};
