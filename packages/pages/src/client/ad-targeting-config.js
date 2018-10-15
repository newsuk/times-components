export default (platformAdConfig, article) => ({
  adUnit: platformAdConfig.adUnit,
  biddersConfig: {},
  bidderSlots: [],
  networkId: platformAdConfig.networkId,
  pageTargeting: {
    aid: article.id,
    cont_type: "art",
    cos: platformAdConfig.operatingSystem,
    cov: platformAdConfig.operatingSystemVersion,
    cpn: platformAdConfig.cookieEid,
    did: platformAdConfig.deviceId,
    eid: platformAdConfig.cookieEid,
    kw: article.keywords.join(),
    log: platformAdConfig.isLoggedIn ? "1" : "0",
    section: platformAdConfig.sectionName,
    Shared: "0",
    testmode: platformAdConfig.testMode,
    vid: ""
  },
  slotTargeting: {
    path: `/${platformAdConfig.sectionName.toLowerCase()}`,
    section: platformAdConfig.sectionName,
    slot: platformAdConfig.sectionName.toLowerCase(),
    zone: "current_edition"
  }
});
