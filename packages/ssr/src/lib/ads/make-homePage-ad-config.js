const { defaultClient, defaultServer } = require("./base-ad-config");
const basePageTargeting = require("./base-page-targeting-config");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    pageTargeting: {
      ...basePageTargeting,
      cont: "listing"
    }
  }),

  defaultServer: () => ({ ...defaultServer })
};
