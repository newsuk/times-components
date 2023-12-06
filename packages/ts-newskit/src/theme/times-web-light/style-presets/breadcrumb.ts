export const breadcrumbStylePresets = {
  breadcrumbStyle: {
    base: {
      textDecoration: 'none',
      color: '{{colors.inkSubtle}}',
      backgroundColor: 'transparent'
    },
    hover: {
      color: '{{colors.blue070}}'
    },
    selected: {
      color: '{{colors.inkContrast}}',
    },
    'selected:hover': {
      color: '{{colors.inkContrast}}',
      textDecoration: 'none'
    }
  },
  breadcrumbSeparator: {
    base: {
      color: '{{colors.inkNonEssential}}'
    }
  }
};
