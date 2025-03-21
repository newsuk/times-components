const slugMap = {
  platformAccessWeb: "fp-1101",
  platformAccessLiveApp: "fp-1102",
  platformAccessClassicApp: "fp-1103",
  platformAccessEpaperApp: "fp-1104",
  platformAccessPuzzlesApp: "fp-1105",
  platformAccessTimesPlus: "fp-1106",
  platformAccessTimesPlusOffers: "fp-1107",
  fullAccessTheTimes: "fp-1108",
  fullAccessPuzzles: "fp-1109",
  fullAccessTheTimesArchives: "fp-1110",
  meteredAccessTheTimes: "fp-1111",
  meteredAccessPuzzles: "fp-1112",
  functionalCommentingFull: "fp-1113",
  functionalCommentingView: "fp-1114",
  functionalCommentingAdd: "fp-1115",
  functionalCommentingReply: "fp-1116",
  functionalCommentingRecommend: "fp-1117",
  functionalCommentingShare: "fp-1118",
  functionalGiftingUnlimited: "fp-1119",
  functionalGiftingMetered: "fp-1120",
  functionalSharing: "fp-1121",
  functionalSaving: "fp-1122",
  functionalOfflineAccessArticles: "fp-1123",
  functionalOfflineAccessMultimedia: "fp-1124",
  functionalOfflineAccessPuzzles: "fp-1125"
};

const hasEntitlement = decisions => entitlement => {
  const slugToLookup = slugMap[entitlement];
  return !!decisions[slugToLookup];
};

export default hasEntitlement;
