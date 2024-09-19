const contentChildren = [
  {
    name: "paragraph",
    children: [
      {
        name: "link",
        attributes: {
          href: "https://www.example.com"
        },
        children: []
      },
      {
        name: "link",
        attributes: {
          href: "https://www.thetimes.com"
        },
        children: []
      }
    ]
  }
];

const setExternalLinkTargets = children => {
  const clonedChildren = [...children];

  const checkAndSetLinkTarget = elements =>
    elements.map(el => {
      let newElement = { ...el };

      if (
        newElement.name === "link" ||
        (newElement.name === "interactive" &&
          newElement.attributes?.element?.value === "times-travel-cta")
      ) {
        const href =
          newElement.name === "interactive"
            ? newElement.attributes?.element?.attributes?.url ?? ""
            : newElement.attributes?.href ?? "";

        // If the link is external, set target to _blank
        if (
          href &&
          !href.startsWith("https://www.thetimes.co.uk") &&
          !href.startsWith("https://www.thetimes.com")
        ) {
          newElement = {
            ...newElement,
            attributes: {
              ...newElement.attributes,
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

const updatedChildren = setExternalLinkTargets(contentChildren);
console.log("logiram updatedChildren,", updatedChildren);

export default setExternalLinkTargets;
