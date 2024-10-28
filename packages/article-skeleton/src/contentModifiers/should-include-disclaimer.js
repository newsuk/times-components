import React, { useEffect, useState } from "react"; // eslint-disable-line

const newDisclaimerText = {
  name: "paragraph",
  children: [
    {
      name: "italic",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value:
              "All recommendations within this article are informed by expert editorial opinion. If you click on a link in this story we may earn affiliate revenue."
          }
        }
      ]
    }
  ]
};

const oldDisclaimerTexts = [
  "This article contains affiliate links that can earn us revenue",
  "This article contains affiliate links that may earn us revenue",
  "This article contains affiliate links which may earn us revenue",
  "This article contains affiliate links, which can earn us revenue",
  "This article contains affiliate links, which may earn us revenue",
  "This article contains affiliate links, which may earn�us revenue",
  "This article contains affiliate links, which�may earn us revenue",
  "This article contains�affiliate links, which may earn us revenue",
  "This article contains affiliate links",
  "This article contains links that can earn us revenue",
  "This article contains links which may earn us revenue",
  "This article contains links, which can earn us revenue",
  "This article contains links, which may earn us revenu",
  "This article contains links from which we may earn revenue"
];

const domainJson = [
  "(clicks.)?trx-hub.com",
  "go.skimresources.com",
  "go.redirectingat.com",
  "(www.)?fave.co",
  "beavertownbrewery.pxf.io",
  "wilko.sjv.io",
  "fanatics.93n6tx.net",
  "ticketmaster-uk.tm7559.net",
  "(www.)?prf.hn",
  "nastygal.prf.hn",
  "selfridges.prf.hn",
  "bloomwild.prf.hn",
  "go.linkby.com",
  "(www.)?awin1.com",
  "track.webgains.com",
  "click.linksynergy.com",
  "(www.)?dpbolvw.net",
  "(www.)?kqzyfj.com",
  "(www.)?anrdoezrs.net",
  "(www.)?veneficus.co.uk",
  "(www.)?shareasale.com",
  "(www.)?privadovpn.com",
  "(www.)?amzn.to",
  "(www.)?amazon.[\\S]*?\\/(dp|gp)\\/[\\S]*?tag=",
  "(www.)?planethowl.com"
];

const isLinkAffiliate = (url = "", adsDomains) => {
  const affiliateStrPattern = `<a\\s[^>]*?href="https?:\\/\\/(${adsDomains.join(
    "|"
  )})`;
  const anchorEl = `<a href="${url}"></a>`;

  const affiliateLinkPattern = new RegExp(affiliateStrPattern, "i");
  return affiliateLinkPattern.test(anchorEl);
};

const shouldIncludeDisclaimer = children => {
  const [domainListing, setDomainListing] = useState(domainJson); // eslint-disable-line

  // eslint-disable-next-line
  useEffect(() => {
    async function getDomainListing() {
      let domainList = domainJson;

      try {
        const getDomains = await fetch(
          "https://ads.thetimes.com/affiliates/domains.json"
        ).then(response => response.text());
        const formattedRes = getDomains.replaceAll("'", '"');
        const parsedRes = JSON.parse(`{"response": ${formattedRes} }`);
        domainList = parsedRes.response;
      } catch (error) {
        console.log("Fetching domain listing failed. Using default."); // eslint-disable-line
      }

      setDomainListing(domainList);
    }

    getDomainListing();
  }, []);

  const clonedChildren = [...children];
  let affiliateLinkExist = false;
  let affiliateDisclaimerExist = false;

  const checkForAffiliate = elements => {
    elements.some(el => {
      // Check if disclaimer text already exists.
      const isTextCollapseComponent = !!(
        el.name === "interactive" &&
        el.attributes &&
        el.attributes.element &&
        el.attributes.element.value &&
        el.attributes.element.value === "times-text-collapse"
      );

      if (
        !affiliateDisclaimerExist &&
        (el.name === "text" || isTextCollapseComponent)
      ) {
        const textComponentVal =
          el.name === "text" && el.attributes && el.attributes.value
            ? el.attributes.value
            : "";
        const interactiveComponentVal =
          isTextCollapseComponent &&
          el.attributes &&
          el.attributes.element &&
          el.attributes.element.attributes &&
          el.attributes.element.attributes.disclaimer_text
            ? el.attributes.element.attributes.disclaimer_text
            : "";

        const text = textComponentVal || interactiveComponentVal;

        if (
          oldDisclaimerTexts.some(contentText => text.includes(contentText))
        ) {
          affiliateDisclaimerExist = true;
        }
      }

      if (affiliateDisclaimerExist) {
        return true;
      }

      // Move to next iteration if element is not link, and doesn't have children.
      if (
        el.name !== "interactive" &&
        el.name !== "link" &&
        (el.children === undefined || !el.children.length)
      ) {
        return false;
      }

      // Check for affiliate links.
      const isTravelCtaComponent = !!(
        el.name === "interactive" &&
        el.attributes &&
        el.attributes.element &&
        el.attributes.element.value &&
        el.attributes.element.value === "times-travel-cta"
      );

      if (!affiliateLinkExist && (el.name === "link" || isTravelCtaComponent)) {
        const linkComponentVal =
          el.name === "link" && el.attributes && el.attributes.href
            ? el.attributes.href
            : "";
        const ctaComponentVal =
          isTravelCtaComponent &&
          el.attributes &&
          el.attributes.element &&
          el.attributes.element.attributes &&
          el.attributes.element.attributes.url
            ? el.attributes.element.attributes.url
            : "";

        const href = linkComponentVal || ctaComponentVal;

        if (!href || !isLinkAffiliate(href, domainListing)) {
          return false;
        }

        affiliateLinkExist = true;
      }

      // Check recursively for nested children.
      if (el.children !== undefined && el.children.length) {
        checkForAffiliate(el.children);
      }

      return affiliateLinkExist;
    });

    return {
      affiliateLinkExist,
      affiliateDisclaimerExist
    };
  };

  const affiliatesCheck = checkForAffiliate(clonedChildren);

  // Add disclaimer after first paragraph (in case disclaimer doesn't already exist).
  if (
    !affiliatesCheck.affiliateDisclaimerExist &&
    affiliatesCheck.affiliateLinkExist
  ) {
    const firstParagraph = clonedChildren.find(el => el.name === "paragraph");

    if (firstParagraph) {
      clonedChildren.splice(
        clonedChildren.indexOf(firstParagraph) + 1,
        0,
        newDisclaimerText
      );
    }
  }

  return clonedChildren;
};

export default shouldIncludeDisclaimer;
