const { defaultClient, defaultServer } = require("./base-ad-config");
const basePageTargeting = require("./base-page-targeting-config");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    pageTargeting: {
      ...basePageTargeting,
      aid: "198c4b2f-ecec-4f34-be53-c89f83bc1b44",
      cont: "art",
      e_uuid: "70388aec-7ba7-11e8-9c4a-473552a1b7c8",
      edition_id: "2018-07-05",
      kw: "couple,poisoned,by,russian,nerve,agent,novichok,novichok,poisoning"
    },
    slotTargeting: {
      path: "/news",
      sec_id: "null",
      section: "news",
      slot: "news",
      zone: "current_edition"
    }
  }),

  defaultServer: () => ({ ...defaultServer })
};
