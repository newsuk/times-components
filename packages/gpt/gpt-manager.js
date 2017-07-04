const GptManager = class GptManager {
  constructor() {
    if (!new.target) {
      return new GptManager();
    }

    this.scriptSet = false;
    this.initialised = false;
    this.googletag = null;
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

  setConfig(callback) {
    if (this.isReady) {
      if (callback) return callback();
      return;
    }

    // Script and related vars must be set first
    if (!this.scriptSet) {
      throw new Error("GPT manager needs the script to be set first");
    }

    const googletag = this.googletag;

    googletag.cmd.push(() => {
      // Infinite scroll requires SRA
      googletag.pubads().enableSingleRequest();

      // add support for async loading
      googletag.pubads().enableAsyncRendering();

      // collapse div without ad
      googletag.pubads().collapseEmptyDivs();

      // load ad with slot refresh
      googletag.pubads().disableInitialLoad();

      if (callback) return callback();
    });
  }

  init(callback) {
    if (this.isReady) {
      if (callback) return callback();
      return;
    }

    // Script and related vars must be set first
    if (!this.scriptSet) {
      throw new Error("GPT manager needs the script to be set first");
    }

    this.googletag.cmd.push(() => {
      // enable google publisher tag
      this.googletag.enableServices();
      this.initialised = true;
      if (callback) return callback();
    });
  }
};

export default new GptManager();
