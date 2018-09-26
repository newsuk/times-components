export default (platformAdConfig, article) => ({
  networkId: platformAdConfig.networkId,
  adUnit: platformAdConfig.adUnit,
  pageTargeting: {
    Shared: "0",
    testmode: platformAdConfig.testMode,
    cont_type: "art",
    kw: article.keywords.join(),
    aid: article.id,
    cos: platformAdConfig.operatingSystem,
    cov: platformAdConfig.operatingSystemVersion,
    cpn: platformAdConfig.cookieEid,
    did: platformAdConfig.deviceId,
    eid: platformAdConfig.cookieEid,
    log: platformAdConfig.isLoggedIn ? "1" : "0",
    vid: "",
    section: platformAdConfig.sectionName
  },
  slotTargeting: {
    path: `/${platformAdConfig.sectionName.toLowerCase()}`,
    section: platformAdConfig.sectionName,
    slot: platformAdConfig.sectionName.toLowerCase(),
    zone: "current_edition"
  },
  bidderSlots: [],
  biddersConfig: {}
});
