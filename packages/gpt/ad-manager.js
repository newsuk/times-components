import series from "run-series";
import parallel from "run-parallel";
import get from "lodash.get";

export default class AdManager {
  constructor(options = {}) {
    if (!new.target) {
      return new AdManager(options);
    }

    this.adQueue = [];
    Object.assign(
      this,
      ({
        adUnit,
        networkId,
        section,
        gptManager,
        pbjsManager,
        getSlotConfig
      } = options)
    );
    this.initialised = false;
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
          this._pushAdToGPT(ad.code, ad.mappings);
        });
        if (callback) callback();
      }
    );
  }

  removeItemFromQueue(queue, itemId) {
    let obj = Object.assign([], queue);
    const objIds = obj.map(item => item.id);
    const idx = objIds.indexOf(itemId);
    return idx > -1 ? obj.filter((item, index) => idx !== index) : obj;
  }

  registerAd(code, { width = 1024 } = {}) {
    this.adQueue.push(this.getSlotConfig(this.section, code, width));
  }

  unregisterAd(code) {
    this.adQueue = this.removeItemFromQueue(this.adQueue, code);
  }

  display(callback) {
    if (
      !get(this.gptManager, "googletag.cmd") ||
      !get(this.pbjsManager, "pbjs.que")
    ) {
      throw new Error("gpt or pbjs properties are unavailable");
      return;
    }

    this.gptManager.googletag.cmd.push(() => {
      this.pbjsManager.pbjs.que.push(() => {
        this.pbjsManager.pbjs.setTargetingForGPTAsync();
        this.gptManager.googletag.pubads().refresh();
        return;
      });
    });
  }

  _pushAdToGPT(adSlotId, sizingMap) {
    if (!this.initialised) {
      throw new Error("Ad manager needs to be initialised first");
    }

    if (!get(this.gptManager, "googletag.cmd")) {
      throw new Error("gpt properties are unavailable");
    }

    this.gptManager.googletag.cmd.push(() => {
      const slot = this._createSlot(adSlotId, this.section);
      slot.addService(this.gptManager.googletag.pubads());
      slot.defineSizeMapping(this._generateSizings(sizingMap));

      // const targeting = omit(options, 'iuPartsSuffix');
      // setSlotTargeting(slot, targeting);

      slot.id = adSlotId;

      // Display the ad
      this.gptManager.googletag.display(adSlotId);
    });
  }

  _generateSizings(sizingMap) {
    if (!get(this.gptManager, "googletag")) {
      throw new Error("gpt properties are unavailable");
    }

    const mapping = this.gptManager.googletag.sizeMapping();

    for (let i = 0; i < sizingMap.length; i++) {
      const size = sizingMap[i];
      mapping.addSize([size.width, size.height], size.sizes);
    }

    return mapping.build();
  }

  _createSlot(adSlotId, section) {
    if (!get(this.gptManager, "googletag")) {
      throw new Error("gpt properties are unavailable");
    }

    return this.gptManager.googletag.defineSlot(
      `/${this.networkId}/${this.adUnit}/${section}`,
      [],
      adSlotId
    );
  }
}
