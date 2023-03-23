export const articleListStylePresets = {
    articleListTitle: {
        base: {
            color: '{{colors.inkSubtle}}',
            margin: '10px 0',
            textDecoration: 'none'
        }
    },
    articleTestLink: {
        base: {
            color: '{{colors.inkSubtle}}',
            textDecoration: 'none'
        },
        hover: {
            color: '{{colors.inkSubtle}}',
            textDecoration: 'none'
        },
        ':hover:not([disabled])': {
            color: '{{colors.inkSubtle}}',
            textDecoration: 'none'
        },
        selected: {
            color: '{{colors.inkSubtle}}',
            textDecoration: 'none'
        },
        'selected:hover': {
            color: '{{colors.inkSubtle}}',
            textDecoration: 'none'
        }
    }
}