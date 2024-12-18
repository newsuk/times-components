import {
  theTimesSiteCode,
  travelSiteCode,
  skimlinksId,
  regexTrackonomics
} from "./affiliate-validation";

const wrapAffiliateLink = affiliateLink => {
  const wrapTrackonomics = trackonomicsUrl => {
    const contentPageUrl =
      "https://www.thetimes.com/travel/inspiration/tour-holidays/adventurous-summer-holidays-kklt22gp8";
    const isTravel =
      contentPageUrl.includes("https://www.thetimes.com/travel") ||
      contentPageUrl.includes("https://www.thetimes.co.uk/travel");

    if (!regexTrackonomics.test(trackonomicsUrl)) {
      return trackonomicsUrl;
    }

    const referrerUrl =
      "https://www.thetimes.com/travel/inspiration/tour-holidays/adventurous-summer-holidays-kklt22gp8";
    const siteCode = isTravel ? travelSiteCode : theTimesSiteCode;
    const affiliateWrapper = `https://clicks.trx-hub.com/xid/${siteCode}?q=${encodeURIComponent(
      trackonomicsUrl
    )}&p=${encodeURIComponent(contentPageUrl)}&ref=${encodeURIComponent(
      referrerUrl
    )}`;

    return affiliateWrapper;
  };

  const wrapSkimlinks = skimlinkUrl => {
    const contentPageUrl =
      "https://www.thetimes.com/travel/inspiration/tour-holidays/adventurous-summer-holidays-kklt22gp8";
    const affiliateWrapper = `https://go.skimresources.com/?id=${skimlinksId}&url=${encodeURIComponent(
      skimlinkUrl
    )}&sref=${encodeURIComponent(contentPageUrl)}`;

    return affiliateWrapper;
  };

  const wrapInSkimlinks = wrapSkimlinks(affiliateLink);
  return wrapTrackonomics(wrapInSkimlinks);
};

const setExternalLinkTargets = children => {
  const clonedChildren = [...children];

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
                url: wrapAffiliateLink(href)
              }
            };
          } else {
            newElement = {
              ...newElement,
              attributes: {
                ...attributes,
                target: "_blank",
                href: wrapAffiliateLink(href)
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

export default setExternalLinkTargets;
