export const menuStylePresets = {
  buttonSolidPrimary: {
    base: {
      backgroundColor: '{{colors.interactivePrimary030}}',
      width: '100%',
      borderRadius: '4px'
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
      borderRadius: '4px'
    },
    hover: {
      backgroundColor: '{{colors.neutral080}}'
    }
  },
  menuState: {
    base: {
      backgroundColor: '#151515',
      color: '{{colors.inkNonEssential}}'
    },
    selected: {
      borderBottom: '2px solid #EEEEEE',
      color: '{{colors.inkInverse}}',
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
      paddingLeft: '16px',
      backgroundColor: '#222222',
      color: '{{colors.inkInverse}}',
      iconColor: '{{colors.neutral050}}',
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
    color: '#828282',
    fontFamily: 'GillSansMTStd-Medium'
    },
  },
  searchBar: {
    base: {
      backgroundColor: '{{colors.interfaceNeutral010}}',
      color: '#9C9C9C',
      borderRadius: '8px',
      height: '40px'
    }
  },
  anotherBlock: {
    base: {
      backgroundColor: '{{colors.neutral100}}',
      display: 'flex',
      alignItems: 'center',
      height: '50px'
    }
  }
};
