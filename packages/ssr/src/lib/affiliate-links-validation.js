const { wrapSkimlinks } = require("./skimlinks-wrapping");
const { wrapTrackonomics } = require("../lib/trackonomics-wrapping");

const wrapAffiliateLink = (affiliateLink, contentPageUrl) => {
  const skimlinksUrl = wrapSkimlinks(affiliateLink, contentPageUrl);

  return wrapTrackonomics(skimlinksUrl, contentPageUrl);
};

module.exports.affiliateLinksValidation = (children, articleDataFromRender) => {
  const clonedChildren = [...children];
  const { canonicalUrl, hostName } = articleDataFromRender;
  const contentPageUrl = `${hostName}${canonicalUrl}`;

  const checkAndSetLinkTarget = elements =>
    elements.map(el => {
      let newElement = { ...el };

      // Check if element is a link or an interactive element with a URL.
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

        // If the link is external, set target to _blank. Wrap affiliate link if necessary.
        if (
          href &&
          !href.startsWith("https://www.thetimes.co.uk") &&
          !href.startsWith("https://www.thetimes.com")
        ) {
          if (newElement.name === "interactive") {
            newElement = {
              ...newElement,
              attributes: {
                ...attributes,
                element: {
                  ...element,
                  attributes: {
                    ...elementAttributes,
                    target: "_blank",
                    url: wrapAffiliateLink(href, contentPageUrl)
                  }
                }
              }
            };
          } else {
            newElement = {
              ...newElement,
              attributes: {
                ...attributes,
                target: "_blank",
                href: wrapAffiliateLink(href, contentPageUrl)
              }
            };
          }
        }
      }

      if (newElement.children && newElement.children.length) {
        newElement.children = checkAndSetLinkTarget(newElement.children);
      }

      return newElement;
    });

  return checkAndSetLinkTarget(clonedChildren);
};
