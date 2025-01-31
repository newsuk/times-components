const { wrapSkimlinks } = require("./skimlinks-wrapping");
const { wrapTrackonomics } = require("../lib/trackonomics-wrapping");
const { affiliateRegex } = require("../constants/affiliate-links-validation");

// eslint-disable-next-line no-unused-vars
const wrapAffiliateLink = (affiliateLink, contentPageUrl) => {
  const skimlinksUrl = wrapSkimlinks(affiliateLink, contentPageUrl);
  const trackonomicsUrl = wrapTrackonomics(skimlinksUrl, contentPageUrl);

  return elementName === "interactive"
    ? {
        url: trackonomicsUrl,
        rel: addRelTag(trackonomicsUrl)
      }
    : {
        href: trackonomicsUrl,
        rel: addRelTag(trackonomicsUrl)
      };
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
        if (isExternalLink(href)) {
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
                    ...wrapAffiliateLink(href, contentPageUrl, newElement.name)
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
                ...wrapAffiliateLink(href, contentPageUrl, newElement.name)
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
