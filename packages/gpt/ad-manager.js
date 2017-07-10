export default class AdManager {
  constructor(options = {}) {
    this.adQueue = [];
    this.adUnit = options.adUnit;
    this.networkId = options.networkId;
    this.section = options.section;
    this.gptManager = options.gptManager;
    this.pbjsManager = options.pbjsManager;
    this.getSlotConfig = options.getSlotConfig;
    this.initialised = false;
  }

  static removeItemFromQueue(queue, itemId) {
    const obj = Object.assign([], queue);
    const objIds = obj.map(item => item.id);
    const idx = objIds.indexOf(itemId);
    return idx > -1 ? obj.filter((item, index) => idx !== index) : obj;
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
      });
  }

  registerAd(code, { width = 1024 } = {}) {
    this.adQueue.push(this.getSlotConfig(this.section, code, width));
  }

  unregisterAd(code) {
    this.adQueue = AdManager.removeItemFromQueue(this.adQueue, code);
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
