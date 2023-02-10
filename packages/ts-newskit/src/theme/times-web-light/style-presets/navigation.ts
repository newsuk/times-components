export const navStylePresets = {
    buttonSolidPrimary: {
      base: {
        backgroundColor: '{{colors.interactivePrimary030}}',
        width: '50%',
        borderRadius: '4px',
        marginBottom: '10px 0 10px 4px',
        display: 'inline-block'
      },
      hover: {
        backgroundColor: '{{colors.interactivePrimary040}}'
      }
    },
    buttonSolidSecondary: {
      base: {
        backgroundColor: '{{colors.neutral090}}',
        border: 'solid 1px #333333',
        width: '50%',
        borderRadius: '4px',
        marginBottom: '10px 4px 10px 0',
        display: 'inline-block'
      },
      hover: {
        backgroundColor: '{{colors.neutral080}}'
      }
    },
    searchIcon: {
      base: {
        marginRight: '19px'
      }
    },
    menuState: {
      base: {
        backgroundColor: '#151515',
        color: '{{colors.inkNonEssential}}'
      },
      selected: {
        borderBottom: '4px solid #1E1E1E',
        color: '{{colors.inkInverse}}',
      }
    },
    menuItemL1: {
      base: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        iconColor: '{{colors.neutral050}}',
        borderBottom: '4px solid transparent'
      },
      hover: {
        borderBottom: '4px solid #1E1E1E'
      },
      active: {
        borderBottom: '4px solid #1E1E1E',
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