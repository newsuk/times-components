/* global window, nuk */
import { isSubscriber } from "@times-components/utils/is-subscriber";
import { cookieHelper } from "@times-components/utils/cookie-helper";
import localStorage from "store";

const removeItemFromQueue = (queue, itemId) => {
  const obj = Object.assign([], queue);
  const objIds = obj.map(item => item.id);
  const idx = objIds.indexOf(itemId);
  return idx > -1 ? obj.filter((item, index) => idx !== index) : obj;
};

class AdManager {
  constructor(options = {}) {
    this.adQueue = [];
    this.adUnit = options.adUnit;
    this.networkId = options.networkId;
    this.section = options.section;
    this.adConfig = options.adConfig;
    this.gptManager = options.gptManager;
    this.pbjsManager = options.pbjsManager;
    this.initialised = false;
  }

  init() {
    // Load scripts if needed be
    this.gptManager.loadScript();
    this.pbjsManager.loadScript();

    const pageOptions = this.setPageLevelConfig(this.adConfig);

    return this.gptManager
      .setConfig(pageOptions)
      .then(this.pbjsManager.setConfig.bind(this.pbjsManager))
      .then(this.gptManager.init.bind(this.gptManager))
      .then(this.pbjsManager.init.bind(this.pbjsManager, this.adQueue))
      .then(() => {
        this.initialised = true;
        // Actually push the ads to GPT
        this.adQueue.forEach(ad => {
          this.pushAdToGPT(ad.code, ad.mappings);
        });
      });
  }

  setPageLevelConfig(adConfig) {
    return {
      edition_id: window.nuk ? nuk.ads.editionDate : null,
      e_uuid: window.nuk ? nuk.ads.editionId : null,
      search: "null",
      share_token: "null",
      shared: "0",
      cont: adConfig.contentType,
      aid: adConfig.id,
      kw: `${adConfig.title} ${adConfig.label} ${
        adConfig.commercialtags
      }`.split(" "),
      pw: "1",
      teaser: window.nuk
        ? !nuk.user.isLoggedIn || nuk.user.isMeteredExpired
        : "0",
      log: window.nuk ? this.isLoggedIn() : "0",
      subscriber: window.nuk ? this.getSubscriber() : "0",
      kuid: localStorage.get("kxkuid"),
      ksg: localStorage.get("kxsegs"),
      ppid: cookieHelper.getCpnId() || "null",
      eid: cookieHelper.getCpnId() || "null",
      om_v_id: cookieHelper.getVistorId() || "null",
      cips: cookieHelper.getCips() || "null",
      refresh: "false"
    };
  }

  getSubscriber() {
    return isSubscriber() ? "1" : "0";
  }

  isLoggedIn() {
    return nuk.user.isLoggedIn ? "1" : "0";
  }

  registerAd(slot) {
    this.adQueue.push(slot);
  }

  unregisterAd(code) {
    this.adQueue = removeItemFromQueue(this.adQueue, code);
  }

  display() {
    return new Promise(resolve => {
      this.gptManager.googletag.cmd.push(() => {
        this.pbjsManager.pbjs.que.push(() => {
          this.pbjsManager.pbjs.setTargetingForGPTAsync();
          this.gptManager.googletag.pubads().refresh();
          return resolve();
        });
      });
    });
  }

  pushAdToGPT(adSlotId, sizingMap) {
    this.gptManager.googletag.cmd.push(() => {
      const slot = this.createSlot(adSlotId, this.section);
      if (!slot) {
        return;
      }
      slot.addService(this.gptManager.googletag.pubads());
      slot.defineSizeMapping(this.generateSizings(sizingMap));

      slot.id = adSlotId;

      // Display the ad
      this.gptManager.googletag.display(adSlotId);
    });
  }

  generateSizings(sizingMap) {
    const mapping = this.gptManager.googletag.sizeMapping();

    for (let i = 0; i < sizingMap.length; i += 1) {
      const size = sizingMap[i];
      mapping.addSize([size.width, size.height], size.sizes);
    }

    return mapping.build();
  }

  createSlot(adSlotId, section) {
    return this.gptManager.googletag.defineSlot(
      `/${this.networkId}/${this.adUnit}/${section}`,
      [],
      adSlotId
    );
  }
}

export default AdManager;
