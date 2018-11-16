const { defaultClient, defaultServer } = require("./base-ad-config");

module.exports = {
  defaultClient: () => ({
    ...defaultClient,
    pageTargeting: {
      aid: "null",
      breakpoint: "medium",
      cips: null,
      cont: "listing",
      e_uuid: "null",
      edition_id: "null",
      eid: "JEK5925426746",
      ksg: "rzxmnyauv",
      kuid: "L3uO9V7m",
      kw: "null",
      log: "1",
      om_v_id: "0159ff285be100121d968d18a23605078001607000c48",
      ppid: "JEK5925426746",
      pw: "1",
      ra: "1",
      refresh: "false",
      search: "null",
      share_token: "null",
      shared: "0",
      teaser: false,
      testmode: "null"
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
