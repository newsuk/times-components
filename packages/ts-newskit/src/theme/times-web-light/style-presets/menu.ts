const loggedInMenuItemBase = {
  color: '{{colors.neutral050}}',
  borderRadius: '{{sizing.sizing000}}',
  borderBottom: '2px solid #333333',
  backgroundColor: '#151515'
};

export const menuStylePresets = {
  loggedOutMenu: {
    base: {
      backgroundColor: '{{colors.neutral090}}'
    }
  },
  loggedInMenuItem: {
    base: loggedInMenuItemBase,
    hover: {
      borderBottom: '2px solid #FFFFFF',
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
      color: '{{colors.inkInverse}}'
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
      backgroundColor: '#222222',
      color: '{{colors.inkInverse}}',
      iconColor: '{{colors.neutral050}}'
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
  }
};
