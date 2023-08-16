export const sliceStylePresets = {
  lightDivider: {
    base: {
      borderStyle: 'solid',
      borderWidth: '{{borders.borderWidth010}}',
      borderColor: '{{colors.interface040}}'
    }
  },
  dashedDivider: {
    base: {
      borderStyle: 'dashed',
      borderWidth: '{{borders.borderWidthDefault}}',
      borderColor: '{{colors.interface060}}'
    }
  },
  expirableFlagLivePreset: {
    base: {
      backgroundColor: '{{colors.interactiveNegative030}}',
      color: '{{colors.interactiveInverse030}}'
    }
  },
  expirableFlagPreset: {
    base: {
      color: '{{colors.interactiveNegative030}}'
    }
  }
};
