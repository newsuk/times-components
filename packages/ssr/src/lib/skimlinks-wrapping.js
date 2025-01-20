const { flowRight } = require("lodash");
const { publisherId } = require("../constants/affiliate-links-validation");

const getSecondLevelDomain = str => str.replace(/^(https?:\/\/)?www\./, "");

const trim = str => str.trim();

const removeTrailingSlash = str => str.replace(/\/$/, "");

const stringifyArg = str => (typeof str === "string" ? str : "");

/**
 * Removes http scheme, `www.`, and trailing slash from the string
 * @param str
 * @returns Domain name without www
 */
const sanitizeDomainName = flowRight(
  removeTrailingSlash,
  getSecondLevelDomain,
  trim,
  stringifyArg
);

const fetchSkimlinksDomains = async () => {
  const response = await fetch(
    "https://ads.thesun.co.uk/skimlinks/domains.json"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { domains } = await response.json();

  return domains;
};

/**
 *
 * @param domains List of domains
 * @returns Array of just retailer domains
 */
const filterDomains = domains =>
  Array.isArray(domains)
    ? domains.map(retailer => retailer.domain).map(sanitizeDomainName)
    : [];

const createDomainRegex = domains => {
  const domainRegexString = domains.join("|");
  const skimlinksRegex = new RegExp(domainRegexString);

  return skimlinksRegex;
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

const wrapSkimlinks = (url, contentPageUrl, filteredDomains) => {
  const skimlinksRegex = createDomainRegex(filteredDomains);

  if (skimlinksRegex.test(url)) {
    return constructSkimlinksUrl(url, contentPageUrl);
  }

  return url;
};

module.exports = {
  wrapSkimlinks,
  fetchSkimlinksDomains,
  filterDomains
};
