export const buttonStylePresets = {
  collapseButton: {
    base: {
      backgroundColor: 'transparent',
      borderColor: '{{colors.interactiveSecondary030}}',
      borderStyle: 'solid',
      borderWidth:
        '{{borders.borderWidth020}} {{borders.borderWidth000}} {{borders.borderWidth000}} {{borders.borderWidth000}}'
    }
  },
  updateButton: {
    base: {
      backgroundColor: '{{colors.interactiveNegative040}}',
      borderRadius: '{{borders.borderRadiusSharp}}',
      color: '{{colors.inkInverse}}',
      shadow: '{{shadows.shadow040}}'
    },
    hover: {
      backgroundColor: '{{colors.interactiveNegative050}}'
    },
    active: {
      backgroundColor: '{{colors.interactiveNegative050}}'
    },
    loading: {
      backgroundColor: '{{colors.interface040}}',
      borderRadius: '{{borders.borderRadiusCircle}}'
    }
  }
};
