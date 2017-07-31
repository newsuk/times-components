import gptManager from "./gpt-manager";
import pbjsManager from "./pbjs-manager";

class AdManager {
  constructor(options) {
    this.adQueue = [];
    this.registeredSlots = {};
    this.adUnit = options.adUnit;
    this.networkId = options.networkId;
    this.section = options.section;
    // Optionally provide the gpt and pbjs managers
    this.gptManager = options.gptManager || gptManager;
    this.pbjsManager = options.pbjsManager || pbjsManager;
    this.initialised = false;
  }

  init() {
    // Load scripts if needed be
    this.gptManager.loadScript();
    this.pbjsManager.loadScript();

    return this.gptManager
      .setConfig()
      .then(this.pbjsManager.setConfig.bind(this.pbjsManager))
      .then(this.gptManager.init.bind(this.gptManager))
      .then(this.pbjsManager.init.bind(this.pbjsManager, this.adQueue))
      .then(() => {
        this.initialised = true;
        // Actually push the ads to GPT
        this.adQueue.forEach(ad => {
          this.pushAdToGPT(ad.code, ad.mappings);
        });
        this.adQueue = [];
      });
  }

  registerAd(adConfig) {
    this.adQueue.push(adConfig);
  }

  unregisterAds(codes) {
    const slotsToRemove = [];
    codes.forEach(code => {
      const registeredSlot = this.registeredSlots[code];
      if (registeredSlot) {
        slotsToRemove.push(registeredSlot);
        delete this.registeredSlots[code];
      }
    });
    return this.gptManager
      .removeAds(slotsToRemove)
      .then(this.pbjsManager.removeAdUnits.bind(this.pbjsManager, codes));
  }

  // Called by the ad components to signal that a new set of ads needs to be fetched
  getAds() {
    // Only request new ads if all the ads have unregistered
    if (Object.keys(this.registeredSlots).length) return Promise.resolve();
    return this.init()
      .then(this.display.bind(this))
      .catch(err => console.error("An error occurred loading ads", err)); // eslint-disable-line no-console
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

      // Keep track of registered ads
      this.registeredSlots[slot.getSlotElementId()] = slot;
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
