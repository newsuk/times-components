const {
  theTimesSiteCode,
  travelSiteCode,
  trackonomicsRegex
} = require("../constants/affiliate-links-validation");
const {
  wrapSkimlinks,
  fetchSkimlinksDomains,
  filterDomains,
  createDomainRegex
} = require("./skimlinks-wrapping");

const isAffiliateLink = url => trackonomicsRegex.test(url);

const wrapAffiliateLink = (affiliateLink, contentPageUrl, skimlinksRegex) => {
  const wrapTrackonomics = trackonomicsUrl => {
    if (!isAffiliateLink(trackonomicsUrl)) {
      return trackonomicsUrl;
    }

    const isTravel =
      contentPageUrl.includes("https://www.thetimes.com/travel") ||
      contentPageUrl.includes("https://www.thetimes.co.uk/travel");

    const siteCode = isTravel ? travelSiteCode : theTimesSiteCode;
    const affiliateWrapper = `https://clicks.trx-hub.com/xid/${siteCode}?q=${encodeURIComponent(
      trackonomicsUrl
    )}&p=${encodeURIComponent(contentPageUrl)}`;

    return affiliateWrapper;
  };

  const skimlinksUrl = wrapSkimlinks(
    affiliateLink,
    contentPageUrl,
    skimlinksRegex
  );
  return wrapTrackonomics(skimlinksUrl);
};

const affiliateLinksValidation = async (children, articleDataFromRender) => {
  const clonedChildren = [...children];
  const { canonicalUrl, hostName } = articleDataFromRender;
  const contentPageUrl = `${hostName}${canonicalUrl}`;

  const skimlinksDomains = await fetchSkimlinksDomains();
  const filteredDomains = filterDomains(skimlinksDomains);
  const skimlinksRegex = createDomainRegex(filteredDomains);

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
                target: "_blank",
                url: wrapAffiliateLink(href, contentPageUrl, skimlinksRegex)
              }
            };
          } else {
            newElement = {
              ...newElement,
              attributes: {
                ...attributes,
                target: "_blank",
                href: wrapAffiliateLink(href, contentPageUrl, skimlinksRegex)
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

module.exports = { affiliateLinksValidation };
