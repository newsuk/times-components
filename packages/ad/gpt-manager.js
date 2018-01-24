/* eslint-env browser */
var forEach = require('lodash/forEach');

const GptManager = class GptManager {
  constructor() {
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

  setConfig(options) {
    const { googletag } = this;
    console.log("&&&&&&&&&&&&&&", options);

    // See https://developers.google.com/doubleclick-gpt/reference#googletagpubadsservice
    return new Promise(resolve => {
      if (this.isReady) return resolve();

      return googletag.cmd.push(() => {

        //SET PAGE LEVEL CONFIG
        this.setPageTargeting (options);

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

  setPageTargeting (options) {
    console.log("FINALYYYY", options);
    forEach(options, function (value, key) {
        googletag.pubads().setTargeting(key, value);
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
};

export default new GptManager();
