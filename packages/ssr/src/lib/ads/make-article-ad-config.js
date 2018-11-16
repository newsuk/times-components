const { defaultClient, defaultServer } = require("./base-ad-config");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    pageTargeting: {
      aid: "198c4b2f-ecec-4f34-be53-c89f83bc1b44",
      breakpoint: "medium",
      cips: null,
      cont: "art",
      e_uuid: "70388aec-7ba7-11e8-9c4a-473552a1b7c8",
      edition_id: "2018-07-05",
      eid: "JEK5925426746",
      ksg: "rzxmnyauv",
      kuid: "L3uO9V7m",
      kw: "couple,poisoned,by,russian,nerve,agent,novichok,novichok,poisoning",
      log: "1",
      om_v_id: "0159ff285be100121d968d18a23605078001607000c48",
      ppid: "JEK5925426746",
      pw: "1",
      ra: "0",
      refresh: "false",
      search: "null",
      share_token: "null",
      shared: "0",
      teaser: false,
      testmode: "lite"
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
