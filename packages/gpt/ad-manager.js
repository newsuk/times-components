import series from "run-series";
import parallel from "run-parallel";

export default class AdManager {
  constructor(options = {}) {
    if (!new.target) {
      return new AdManager(options);
    }

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

  init(callback) {
    // Load scripts if needed be
    this.gptManager.loadScript();
    this.pbjsManager.loadScript();

    series(
      [
        // Set services config
        parallel.bind(parallel, [
          this.gptManager.setConfig.bind(this.gptManager),
          this.pbjsManager.setConfig.bind(this.pbjsManager)
        ]),
        // Init services
        parallel.bind(parallel, [
          this.gptManager.init.bind(this.gptManager),
          this.pbjsManager.init.bind(this.pbjsManager, this.adQueue)
        ])
      ],
      err => {
        if (err) throw new Error(err);
        this.initialised = true;
        // Actually push the ads to GPT
        this.adQueue.forEach(ad => {
          this.pushAdToGPT(ad.code, ad.mappings);
        });
        return callback && callback();
      }
    );
  }

  registerAd(code, { width = 1024 } = {}) {
    this.adQueue.push(this.getSlotConfig(this.section, code, width));
  }

  unregisterAd(code) {
    this.adQueue = AdManager.removeItemFromQueue(this.adQueue, code);
  }

  display(callback) {
    if (!this.initialised) {
      throw new Error("Ad manager needs to be initialised first");
    }

    this.gptManager.googletag.cmd.push(() => {
      this.pbjsManager.pbjs.que.push(() => {
        this.pbjsManager.pbjs.setTargetingForGPTAsync();
        this.gptManager.googletag.pubads().refresh();
        return callback && callback();
      });
    });
  }

  pushAdToGPT(adSlotId, sizingMap) {
    if (!this.initialised) {
      throw new Error("Ad manager needs to be initialised first");
    }

    this.gptManager.googletag.cmd.push(() => {
      const slot = this.createSlot(adSlotId, this.section);
      slot.addService(this.gptManager.googletag.pubads());
      slot.defineSizeMapping(this.generateSizings(sizingMap));

      slot.id = adSlotId;

      // Display the ad
      this.gptManager.googletag.display(adSlotId);
    });
  }

  generateSizings(sizingMap) {
    if (!this.initialised) {
      throw new Error("Ad manager needs to be initialised first");
    }

    const mapping = this.gptManager.googletag.sizeMapping();

    for (let i = 0; i < sizingMap.length; i += 1) {
      const size = sizingMap[i];
      mapping.addSize([size.width, size.height], size.sizes);
    }

    return mapping.build();
  }

  createSlot(adSlotId, section) {
    if (!this.initialised) {
      throw new Error("Ad manager needs to be initialised first");
    }

    return this.gptManager.googletag.defineSlot(
      `/${this.networkId}/${this.adUnit}/${section}`,
      [],
      adSlotId
    );
  }
}
