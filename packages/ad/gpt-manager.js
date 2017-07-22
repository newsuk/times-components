/* eslint-env browser */

const GptManager = class GptManager {
  constructor() {
    this.scriptSet = false;
    this.initialised = false;
    this.googletag = null;
    this.registeredAds = {};
  }

  get isReady() {
    return this.scriptSet && this.initialised;
  }

  loadScript() {
    // Check if script tag is already set
    if (this.scriptSet) return;

    // Set the googletag var
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    this.googletag = window.googletag;

    const gads = document.createElement("script");
    gads.async = true;
    gads.type = "text/javascript";
    gads.src = "//www.googletagservices.com/tag/js/gpt.js";

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(gads);

    this.scriptSet = true;
  }

  setConfig() {
    const googletag = this.googletag;

    // See https://developers.google.com/doubleclick-gpt/reference#googletagpubadsservice
    return new Promise(resolve => {
      if (this.isReady) return resolve();

      return googletag.cmd.push(() => {
        // fetch multiple ads at once
        googletag.pubads().enableSingleRequest();

        // add support for async loading
        googletag.pubads().enableAsyncRendering();

        // collapse div without ad
        googletag.pubads().collapseEmptyDivs();

        // load ad with slot refresh
        googletag.pubads().disableInitialLoad();

        return resolve();
      });
    });
  }

  init() {
    return new Promise(resolve => {
      if (this.isReady) return resolve();
      return this.googletag.cmd.push(() => {
        // enable google publisher tag
        this.googletag.enableServices();
        this.initialised = true;
        return resolve();
      });
    });
  }

  // Optional slots argument will unregister only the specified ads
  removeAds(slots) {
    return new Promise(resolve => {
      this.googletag.cmd.push(() => {
        // Unregister all ads
        if (!slots) {
          this.googletag.destroySlots();
          return resolve();
        }
        // Unregister specifc ads
        this.googletag.destroySlots(slots);
        return resolve();
      })
    });
  }
};

export default new GptManager();
