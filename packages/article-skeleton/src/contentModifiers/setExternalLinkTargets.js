const contentChildren = [
  {
    name: 'paragraph',
    children: [
      {
        name: 'link',
        attributes: {
          href: 'https://www.example.com',
        },
        children: [],
      },
    ],
  },
];

export const setExternalLinkTargets = (children) => {
  const clonedChildren = [...children];
  const checkAndSetLinkTarget = (elements) => {
    elements.forEach((el) => {
      // Check if element is a link or an interactive element with a URL
      if (
        (el.name === 'link' || (el.name === 'interactive' && el.attributes?.element?.value === 'times-travel-cta'))
      ) {
        const href = el.name === 'interactive'
          ? el.attributes?.element?.attributes?.url ?? ''
          : el.attributes?.href ?? '';

        // If the link is external, set target to _blank
        if (href && !href.startsWith('https://www.thetimes.co.uk') && !href.startsWith('https://www.thetimes.com')) {
          el.attributes = {
            ...el.attributes,
            target: '_blank',
          };
        }
      }

      // Recursively check for nested children
      if (el.children && el.children.length) {
        checkAndSetLinkTarget(el.children);
      }
    });
  };

  checkAndSetLinkTarget(clonedChildren);
  return clonedChildren;
};

const updatedChildren = setExternalLinkTargets(contentChildren);
console.log(updatedChildren);

export default setExternalLinkTargets;
