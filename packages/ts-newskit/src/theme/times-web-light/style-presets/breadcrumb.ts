export const breadcrumbStylePresets = {
  breadcrumbStyle: {
    base: {
      textDecoration: 'none',
      color: '{{colors.inkSubtle}}'
    },
    hover: {
      color: '{{colors.blue110}}'
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
