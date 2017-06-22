import series from 'run-series';
import parallel from 'run-parallel';

import { getSlotConfig } from './generate-config';
import gptManager from './gpt-manager';
import pbjsManager from './pbjs-manager';

function AdManager (options = {}) {
  if (!(this instanceof AdManager)) {
    return new AdManager();
  }

  this.adQueue = [];
  this.adUnit = options.adUnit;
  this.networkId = options.networkId;
  this.section = options.section;
  this.initialised = false;
}

AdManager.prototype.isReady = function isReady () {
  return this.initialised;
};

AdManager.prototype.init = function init (callback) {
  // Load scripts if needed be
  gptManager.loadScript();
  pbjsManager.loadScript();

  series([
    // Set services config
    parallel.bind(parallel, [
      gptManager.setConfig.bind(gptManager),
      pbjsManager.setConfig.bind(pbjsManager)
    ]),
    // Init services
    parallel.bind(parallel, [
      gptManager.init.bind(gptManager),
      pbjsManager.init.bind(pbjsManager, this.adQueue)
    ])],
    (err) => {
      if (err) throw new Error(err);
      this.initialised = true;
      // Actually push the ads to GPT
      this.adQueue.forEach((ad) => {
        this._pushAdToGPT(ad.code, ad.mappings, ad.options);
      });
      if (callback) callback();
    }
  );
};

AdManager.prototype.registerAd = function registerAd (code, { width = 1024 } = {}) {
  this.adQueue.push(getSlotConfig(this.section, code, width));
};

AdManager.prototype.unregisterAd = function registerAd (code) {
  const queueIds = this.adQueue.map((item) => item.id);
  const idx = queueIds.indexOf(code);
  if (idx > -1) {
    this.adQueue.splice(idx, 1);
  }
};

AdManager.prototype.display = function display (callback) {
  gptManager.googletag.cmd.push(() => {
    pbjsManager.pbjs.que.push(() => {
      console.log('refresh')
      pbjsManager.pbjs.setTargetingForGPTAsync();
      gptManager.googletag.pubads().refresh();
      if(callback) callback();
    });
  });
};

AdManager.prototype._pushAdToGPT = function pushAdToGPT (adSlotId, sizingMap, options = {}) {
  if (!this.initialised) {
    throw new Error('Ad manager needs to be initialised first');
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
console.log('Display slot', slot)
console.log('Sizing map', sizingMap)
  });
};

AdManager.prototype._generateSizings = function generateSizings (sizingMap) {
  const mapping = gptManager.googletag.sizeMapping();

  for (let i = 0; i < sizingMap.length; i++) {
    const size = sizingMap[i];
    mapping.addSize([size.width, size.height], size.sizes);
  }

  return mapping.build();
};

AdManager.prototype._createSlot = function createSlot (adSlotId, section) {
  return gptManager.googletag.defineSlot(`/${this.networkId}/${this.adUnit}/${section}`, [], adSlotId);
};

export default AdManager;
