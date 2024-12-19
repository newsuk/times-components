const dividerStylePresets = {
  solidDividerPreset010: {
    base: {
      borderBottom: '{{borders.borderWidth010}} solid {{colors.neutral100}}',
      borderRadius: '{{borders.borderRadiusSharp}}',
    },
  },
  solidDividerPreset020: {
    base: {
      borderBottom: '{{borders.borderWidth030}} solid {{colors.neutral100}}',
      borderRadius: '{{borders.borderRadiusSharp}}',
    },
  },
  dashedDividerPreset: {
    base: {
      borderWidth: '{{borders.borderWidth010}}',
      borderStyle: 'dashed',
      borderColor: '{{colors.neutral040}}',
    },
  },
};

const labelTextStylePresets = {
  labelPreset010: {
    base: {
      color: '{{colors.neutral100}}',
    },
  },
};

const articleTextStylePresets = {
  articleTagPreset: {
    base: {
      textTransform: 'uppercase',
      color: '#149FB5',
    },
  },
  articleHeadlinePreset: {
    base: {
      color: '{{colors.neutral100}}',
    },
  },
  articleSummaryPreset: {
    base: {
      color: '{{colors.neutral070}}',
    },
  },
};

export const stylePresets = {
  ...dividerStylePresets,
  ...articleTextStylePresets,
  ...labelTextStylePresets,
};
