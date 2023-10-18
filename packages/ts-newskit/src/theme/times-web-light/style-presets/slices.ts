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
      borderStyle: 'dashed none none none',
      borderWidth: '{{borders.borderWidthDefault}}',
      borderColor: '{{colors.interface060}}'
    }
  },
  lightDashedDivider: {
    base: {
      borderStyle: 'dashed none none none',
      borderWidth: '{{borders.borderWidthDefault}}',
      borderColor: '{{colors.interface050}}'
    }
  },
  expirableFlagPreset: {
    base: {
      color: '{{colors.interactiveNegative030}}'
    }
  }
};
