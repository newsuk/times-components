export const secondaryNavigationStylePresets = {
  subMenu: {
    base: {
      borderRadius: '{{sizing.sizing010}}',
      backgroundColor: '{{colors.white}}'
    }
  },
  menuItemDesktop: {
    base: {
      color: '#1D1D1B',
      backgroundColor: '{{colors.white}}',
      borderBottom: '4px solid transparent'
    },
    hover: {
      backgroundColor: '{{colors.neutral010}}'
    },
    selected: {
      borderBottom: '4px solid #01000D'
    }
  },

  secondaryMenuItem: {
    base: {
      color: '#1D1D1B',
      borderBottom: '1px solid #E4E4E4'
    },
    hover: {
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

  secondaryNavMenuBlock: {
    base: {
      backgroundColor: '{{colors.neutral010}}'
    }
  },

  menuItemMore: {
    base: {
      color: '#1D1D1B'
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

export const subMenuDesktopStylePreset = {
  paddingBlockStart: 'space020',
  paddingBlockEnd: 'space030',
  paddingInlineStart: 'space040',
  paddingInlineEnd: 'space040'
};

export const subMenuStylePreset = {
  marginBlockStart: 'space020',
  marginInlineEnd: 'space020',
  paddingInline: 'space030',
  minHeight: 'sizing060',
  stylePreset: 'subMenu'
};

export const secondaryNavMenuBlockStylePreset = {
  paddingInlineStart: 'space040',
  paddingInlineEnd: 'space040',
  stylePreset: 'secondaryNavMenuBlock'
};

export const menuItemDesktopStylePreset = {
  paddingInlineStart: '6px',
  paddingInlineEnd: '6px',
  stylePreset: 'menuItemDesktop'
};

export const secondaryMenuItemMobileStylePreset = {
  paddingInlineStart: 'space060',
  paddingInlineEnd: 'space060',
  marginBlockStart: '-2px',
  marginInlineEnd: '-2px',
  stylePreset: 'secondaryMenuItem'
};
