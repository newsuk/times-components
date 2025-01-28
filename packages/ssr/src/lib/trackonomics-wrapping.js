const {
  travelSiteCode,
  theTimesSiteCode,
  trackonomicsRegex
} = require("../constants/affiliate-links-validation");

const isTrackonomicsUrl = url => trackonomicsRegex.test(url);

const getSiteCode = contentPageUrl => {
  const isTravelUrl =
    contentPageUrl.includes("https://www.thetimes.com/travel") ||
    contentPageUrl.includes("https://www.thetimes.co.uk/travel");

  return isTravelUrl ? travelSiteCode : theTimesSiteCode;
};

const constructTrackonomicsUrl = (trackonomicsUrl, contentPageUrl) => {
  const siteCode = getSiteCode(contentPageUrl);

  const trackonomicsWrapper = `https://clicks.trx-hub.com/xid/${siteCode}?q=${encodeURIComponent(
    trackonomicsUrl
  )}&p=${encodeURIComponent(contentPageUrl)}`;

  return trackonomicsWrapper;
};

const wrapTrackonomics = (url, trackonomicsUrl, contentPageUrl) => {
  return isTrackonomicsUrl(url)
    ? constructTrackonomicsUrl(trackonomicsUrl, contentPageUrl)
    : trackonomicsUrl;
};

module.exports = { wrapTrackonomics };
