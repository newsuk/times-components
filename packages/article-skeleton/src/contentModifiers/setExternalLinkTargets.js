const setExternalLinkTargets = children => {
  const clonedChildren = [...children];

  const checkAndSetLinkTarget = elements =>
    elements.map(el => {
      let newElement = { ...el };

      // Check if element is a link or an interactive element with a URL
      if (
        newElement.name === "link" ||
        (newElement.name === "interactive" &&
          newElement.attributes &&
          newElement.attributes.element &&
          newElement.attributes.element.value === "times-travel-cta")
      ) {
        const { attributes } = newElement;
        const { element } = attributes || {};
        const { attributes: elementAttributes } = element || {};
        const href =
          newElement.name === "interactive"
            ? elementAttributes.url || ""
            : attributes.href || "";

        // If the link is external, set target to _blank
        if (
          href &&
          !href.startsWith("https://www.thetimes.co.uk") &&
          !href.startsWith("https://www.thetimes.com")
        ) {
          newElement = {
            ...newElement,
            attributes: {
              ...attributes,
              target: "_blank"
            }
          };
        }
      }

      if (newElement.children && newElement.children.length) {
        newElement.children = checkAndSetLinkTarget(newElement.children);
      }

      return newElement;
    });

  return checkAndSetLinkTarget(clonedChildren);
};

export default setExternalLinkTargets;
