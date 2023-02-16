const loggedInMenuItemBase = {
  fontSize: '15px',
  color: '{{colors.neutral050}}',
  borderRadius: '{{sizing.sizing000}}',
  borderBottom: '2px solid #333333',
  width: '100%',
  backgroundColor: '#151515'
};

export const menuStylePresets = {
  loggedInMenuItem: {
    base: loggedInMenuItemBase,
    hover: {
      borderBottom: '2px solid #FFFFFF',
      backgroundColor: '#151515',
      color: '{{colors.white}}'
    }
  },
  loggedInMenuItemActive: {
    base: {
      ...loggedInMenuItemBase,
      borderBottom: '2px solid #FFFFFF',
      color: '{{colors.white}}'
    }
  },
  buttonSolidPrimary: {
    base: {
      backgroundColor: '{{colors.interactivePrimary030}}',
      width: '100%',
      borderRadius: '{{sizing.sizing010}}'
    },
    hover: {
      backgroundColor: '{{colors.interactivePrimary040}}'
    }
  },
  buttonSolidSecondary: {
    base: {
      backgroundColor: '{{colors.neutral090}}',
      border: 'solid 1px #333333',
      width: '100%',
      borderRadius: '{{sizing.sizing010}}'
    },
    hover: {
      backgroundColor: '{{colors.neutral080}}'
    }
  },
  menuItemL1: {
    base: {
      backgroundColor: '#151515',
      iconColor: '{{colors.neutral050}}',
      color: '{{colors.inkInverse}}',
      fontSize: '15px',
      fontFamily: 'Roboto-Medium'
    },
    hover: {
      backgroundColor: '{{colors.interfaceNeutral010}}'
    },
    active: {
      backgroundColor: '#222222'
    }
  },
  menuItemL2: {
    base: {
      paddingLeft: '32px',
      backgroundColor: '#222222',
      color: '{{colors.inkInverse}}',
      iconColor: '{{colors.neutral050}}',
      fontSize: '15px',
      fontFamily: 'Roboto-Medium'
    },
    hover: {
      backgroundColor: '{{colors.interfaceNeutral010}}'
    },
    active: {
      backgroundColor: '{{colors.interfaceNeutral010}}'
    }
  },
  divider: {
    base: {
      color: '{{colors.interfaceNeutral010}}',
      borderColor: '{{colors.interfaceNeutral010}}'
    }
  },
  blockWrapper: {
    base: {
      backgroundColor: '#151515',
      color: '#828282'
    }
  },
  searchBar: {
    base: {
      backgroundColor: '{{colors.interfaceNeutral010}}',
      color: '#9C9C9C',
      borderRadius: '{{sizing.sizing020}}',
      marginBottom: 0,
      height: '40px'
    }
  },
  IconPreset1: {
    base: {
      transform: 'rotate(270deg)'
    }
  },
  IconPreset2: {
    base: {
      transform: 'rotate(180deg)'
    }
  }
};
