const chipBase = {
  borderRadius: '{{borders.borderRadiusPill}}',
  border: '{{borders.borderWidth010}} solid #eaeaea',
  backgroundColor: '{{colors.white}}',
  color: '#002a31',
  padding: '11px 14px'
};

export const chipStylePresets = {
  chipBasePreset: {
    base: chipBase,
    hover: {
      border: '{{borders.borderWidth010}} solid #c5c5c5'
    }
  },
  chipSelectedPreset: {
    base: {
      ...chipBase,
      border: '{{borders.borderWidth010}} solid #149fb5',
      backgroundColor: '{{colors.teal010}}'
    }
  },
  chipDisabledPreset: {
    base: {
      ...chipBase,
      border:
        '{{borders.borderWidth010}} solid {{colors.interactiveDisabled010}}',
      color: '{{colors.neutral060}}'
    }
  }
};
