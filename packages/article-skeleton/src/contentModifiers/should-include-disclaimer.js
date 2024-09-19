const newDisclaimerText = {
  name: 'paragraph',
  children: [
    {
        name: 'italic',
        children: [
          {
            name: 'text',
            children: [],
            attributes: {
              value: 'All recommendations within this article are informed by expert editorial opinion. If you click on a link in this story we may earn affiliate revenue.'
            }
          }
        ]
    }
  ]
}


const oldDisclaimerTexts = [
  'This article contains affiliate links that can earn us revenue',
  'This article contains affiliate links that may earn us revenue',
  'This article contains affiliate links which may earn us revenue',
  'This article contains affiliate links, which can earn us revenue',
  'This article contains affiliate links, which may earn us revenue',
  'This article contains affiliate links, which may earn�us revenue',
  'This article contains affiliate links, which�may earn us revenue',
  'This article contains�affiliate links, which may earn us revenue',
  'This article contains affiliate links',
  'This article contains links that can earn us revenue',
  'This article contains links which may earn us revenue',
  'This article contains links, which can earn us revenue',
  'This article contains links, which may earn us revenu',
  'This article contains links from which we may earn revenue',
];

const shouldIncludeDisclaimer = (children) => {
  const clonedChildren = [...children];
  let affiliateLinkExist = false;
  let affiliateDisclaimerExist = false;
  const checkForAffiliate = (elements) => { // eslint-disable-next-line array-callback-return, consistent-return
    elements.some((el) => {
      // Check if disclaimer text already exists.
      if (
        !affiliateDisclaimerExist &&
        (el.name === 'text' ||
        (el.name === 'interactive' && el.attributes?.element?.value === 'times-text-collapse'))
      ) {
        const text = (el.name === 'interactive') ? (el.attributes?.element?.attributes?.disclaimer_text ?? '') : (el.attributes?.value ?? '');
        if (oldDisclaimerTexts.some((contentText) => text.includes(contentText))) {
          affiliateDisclaimerExist = true;
        }
      }
      if (affiliateDisclaimerExist) {
        return true;
      }
      // Move to next iteration if element is not link, and doesn't have children.
      if (
        el.name !== 'interactive' &&
        el.name !== 'link' &&
        (el.children === undefined || !el.children.length)
      ) {
        return false;
      }
      // Check for affiliate links.
      if (
        !affiliateLinkExist &&
        ((el.name === 'interactive' && el.attributes?.element?.value === 'times-travel-cta') ||
        el.name === 'link')
      ) {
        const href = (el.name === 'interactive') ? (el.attributes?.element?.attributes?.url ?? '') : (el.attributes?.href ?? '');
        if (
          !href ||
          href.startsWith('https://www.thetimes.co.uk') ||
          href.startsWith('https://www.thetimes.com')
        ) {
          return false;
        }
        affiliateLinkExist = true;
        console.log('linkovi boolean:', affiliateLinkExist);
      }
      // Check recursively for nested children.
      if (el.children !== undefined && el.children.length) {
        checkForAffiliate(el.children);
      }
    });
    return {
      affiliateLinkExist,
      affiliateDisclaimerExist
    };
  }
  const affiliatesCheck = checkForAffiliate(clonedChildren);
  // Add disclaimer after first paragraph (in case disclaimer doesn't already exist).
  if (!affiliatesCheck.affiliateDisclaimerExist && affiliatesCheck.affiliateLinkExist) {
    const firstParagraph = clonedChildren.find((el) => el.name === 'paragraph');
    clonedChildren.splice(clonedChildren.indexOf(firstParagraph) + 1, 0, newDisclaimerText);
  }
  return clonedChildren;
}
export default shouldIncludeDisclaimer;
