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
  pillButton: {
    base: {
      borderRadius: '{{borders.borderRadiusPill}}',
      backgroundColor: '{{colors.red090}}',
      color: '{{colors.inkInverse}}'
    },
    hover: {
      backgroundColor: '{{colors.red100}}',
    },
    active: {
      backgroundColor: '{{colors.red100}}',
    },
    loading: {
      backgroundColor: '{{colors.interface040}}',
      borderRadius: '{{borders.borderRadiusCircle}}',
    }
  },
};
