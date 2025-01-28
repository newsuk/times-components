const { publisherId } = require("../constants/affiliate-links-validation");
const { skimlinksDomainSet } = require("../constants/skimlinks-domains");

const extractDomain = url => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch (error) {
    return null;
  }
};

const urlContainsDomain = url => {
  const domain = extractDomain(url);

  // Ensure skimlinksDomainSet is a Set and domain is valid
  if (domain && skimlinksDomainSet instanceof Set) {
    return skimlinksDomainSet.has(domain);
  }

  return false;
};

/**
 *
 * @param merchantUrl The merchants url (monetizable link)
 * @param contentPageUrl The referring page
 * @returns Skimlinks url
 */
const constructSkimlinksUrl = (merchantUrl, contentPageUrl) => {
  const skimlinksWrapper = `https://go.skimresources.com/?id=${publisherId}&url=${encodeURIComponent(
    merchantUrl
  )}&sref=${encodeURIComponent(contentPageUrl)}`;

  return skimlinksWrapper;
};

const wrapSkimlinks = (url, contentPageUrl) => {
  return urlContainsDomain(url)
    ? constructSkimlinksUrl(url, contentPageUrl)
    : url;
};

module.exports = { wrapSkimlinks };
