export const accordionStylePresets = {
  accordionHeader: {
    base: {
      color: '{{colors.inkPuzzle}}',
      borderStyle: 'none none dashed none',
      iconColor: '{{colors.inkSubtle}}'
    },
    hover: {
      backgroundColor: 'none',
      color: '{{colors.inkPuzzle}}',
      iconColor: '{{colors.inkSubtle}}'
    }
  },
  accordionPanel: {
    base: {
      borderStyle: 'none none dashed none'
    }
  },

  accordionHeaderPrimary: {
    base: {
      color: '{{colors.inkBase}}',
      backgroundColor: '{{colors.white}}',
      borderWidth: '1px',
      borderStyle: 'none none solid none',
      borderColor: '{{colors.neutral050}}'
    }
  },
  accordionPanelPrimary: {
    base: {
      color: '{{colors.inkSubtle}}',
      borderWidth: '1px',
      borderStyle: 'none none solid none',
      borderColor: '{{colors.neutral050}}'
    }
  }
};
