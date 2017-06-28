import series from "run-series";
import parallel from "run-parallel";

import { getSlotConfig } from "./generate-config";
import gptManager from "./gpt-manager";
import pbjsManager from "./pbjs-manager";

export default class AdManager {
  constructor(options = {}) {
    if (!(this instanceof AdManager)) {
      return new AdManager(options);
    }

    this.adQueue = [];
    this.adUnit = options.adUnit;
    this.networkId = options.networkId;
    this.section = options.section;
    this.initialised = false;
  }

  isReady() {
    return this.initialised;
  }

  init(callback) {
    // Load scripts if needed be
    gptManager.loadScript();
    pbjsManager.loadScript();

    series(
      [
        // Set services config
        parallel.bind(parallel, [
          gptManager.setConfig.bind(gptManager),
          pbjsManager.setConfig.bind(pbjsManager)
        ]),
        // Init services
        parallel.bind(parallel, [
          gptManager.init.bind(gptManager),
          pbjsManager.init.bind(pbjsManager, this.adQueue)
        ])
      ],
      err => {
        if (err) throw new Error(err);
        this.initialised = true;
        // Actually push the ads to GPT
        this.adQueue.forEach(ad => {
          this._pushAdToGPT(ad.code, ad.mappings, ad.options);
        });
        if (callback) callback();
      }
    );
  }

  registerAd(code, { width = 1024 } = {}) {
    this.adQueue.push(getSlotConfig(this.section, code, width));
  }

  unregisterAd(code) {
    const queueIds = this.adQueue.map(item => item.id);
    const idx = queueIds.indexOf(code);
    if (idx > -1) {
      this.adQueue.splice(idx, 1);
    }
  }

  display(callback) {
    gptManager.googletag.cmd.push(() => {
      pbjsManager.pbjs.que.push(() => {
        pbjsManager.pbjs.setTargetingForGPTAsync();
        gptManager.googletag.pubads().refresh();
        if (callback) callback();
      });
    });
  }

  _pushAdToGPT(adSlotId, sizingMap, options = {}) {
    if (!this.initialised) {
      throw new Error("Ad manager needs to be initialised first");
    }

    gptManager.googletag.cmd.push(() => {
      const slot = this._createSlot(adSlotId, this.section);
      slot.addService(gptManager.googletag.pubads());
      slot.defineSizeMapping(this._generateSizings(sizingMap));

      // const targeting = omit(options, 'iuPartsSuffix');
      // setSlotTargeting(slot, targeting);

      slot.id = adSlotId;

      // Display the ad
      gptManager.googletag.display(adSlotId);
    });
  }

  _generateSizings(sizingMap) {
    const mapping = gptManager.googletag.sizeMapping();

    for (let i = 0; i < sizingMap.length; i++) {
      const size = sizingMap[i];
      mapping.addSize([size.width, size.height], size.sizes);
    }

    return mapping.build();
  }

  _createSlot(adSlotId, section) {
    return gptManager.googletag.defineSlot(
      `/${this.networkId}/${this.adUnit}/${section}`,
      [],
      adSlotId
    );
  }
}
