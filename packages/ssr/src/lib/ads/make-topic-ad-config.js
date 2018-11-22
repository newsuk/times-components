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
      path: "topic/chelsea",
      section: "topic/chelsea",
      slot: "home",
      zone: "topic"
    }
  }),

  defaultServer: () => ({ ...defaultServer })
};
