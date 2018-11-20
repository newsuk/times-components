const { defaultClient, defaultServer } = require("./base-ad-config");
const listPageTargeting = require("./list-page-targeting");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    ...listPageTargeting,
    slotTargeting: {
      path: "topic/chelsea",
      section: "topic/chelsea",
      slot: "home",
      zone: "topic"
    }
  }),

  defaultServer: () => ({ ...defaultServer })
};
