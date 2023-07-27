export const breadcrumbStylePresets = {
  breadcrumbStyle: {
    base: {
      textDecoration: 'none',
      color: '{{colors.inkSubtle}}'
    },
    hover: {
      color: '{{colors.blue070}}'
    },
    selected: {
      color: '{{colors.inkContrast}}',
      backgroundColor: 'transparent'
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
