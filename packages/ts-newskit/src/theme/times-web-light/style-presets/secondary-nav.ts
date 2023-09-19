export const secondaryNavigationStylePresets = {
  subMenu: {
    base: {
      borderRadius: '{{sizing.sizing010}}',
      backgroundColor: '{{colors.white}}'
    }
  },
  menuItemDesktop: {
    base: {
      color: '{{colors.neutral090}}',
      backgroundColor: '{{colors.white}}',
      borderBottom: '4px solid transparent'
    },
    hover: {
      backgroundColor: '{{colors.neutral010}}'
    },
    selected: {
      borderBottom: '4px solid {{colors.neutral100}}'
    }
  },

  secondaryMenuItem: {
    base: {
      color: '{{colors.neutral090}}',
      borderBottom: '1px solid {{colors.neutral030}}'
    },
    hover: {
      backgroundColor: '{{colors.neutral010}}',
      borderBottom: '1px solid {{colors.neutral010}}'
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

  secondaryNavMenuBlock: {
    base: {
      backgroundColor: '{{colors.neutral010}}'
    }
  },

  menuItemMore: {
    base: {
      color: '{{colors.neutral090}}'
    }
  },
  subMenuPreset1: {
    base: {
      backgroundColor: '{{colors.white}}'
    },
    hover: {
      backgroundColor: '{{colors.neutral010}}'
    }
  },
  subMenuPreset2: {
    base: {
      backgroundColor: '{{colors.neutral010}}'
    }
  }
};
