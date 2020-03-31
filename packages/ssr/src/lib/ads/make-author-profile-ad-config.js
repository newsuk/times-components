const { defaultClient, defaultServer } = require("./base-ad-config");
const basePageTargeting = require("./base-page-targeting-config");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    pageTargeting: {
      ...basePageTargeting,
      cont: "listing"
    },
    slotTargeting: {
      path: "profile/lucy-fisher",
      section: "profile/lucy-fisher",
      slot: "home",
      zone: "profile"
    }
  }),

  defaultServer: () => ({ ...defaultServer })
};
