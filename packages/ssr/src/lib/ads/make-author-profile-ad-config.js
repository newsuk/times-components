const { defaultClient, defaultServer } = require("./base-ad-config");
const listPageTargeting = require("./list-page-targeting");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    ...listPageTargeting,
    slotTargeting: {
      path: "profile/lucy-fisher",
      section: "profile/lucy-fisher",
      slot: "home",
      zone: "profile"
    }
  }),

  defaultServer: () => ({ ...defaultServer })
};
