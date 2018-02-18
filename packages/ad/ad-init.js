/* eslint-env browser */

// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

const adInit = args => {
  const {
    el,
    data,
    window,
    globals, // : { googletag, gs_channels = "DEFAULT", pbjs, apstag }, // eslint-disable-line camelcase
    renderComplete
  } = args;
  const logTypes = ["amazon", "gpt", "pbjs", "verbose"];
  const log = (type, message) => {
    if (!logTypes.includes(type)) return;
    console.log(`${type}: ${message}`); // eslint-disable-line no-console
  };
  return {
    scheduleGPTAction(gtag, label, action) {
      gtag.cmd.push(action);
    },
    schedulePrebidAction(pb, label, action) {
      pb.que.push(action);
    },
    getAdUnitPath(params) {
      return params.reduce(
        (acc, cur, index) => (index === 1 ? `/${acc}/${cur}` : `${acc}/${cur}`)
      );
    },
    setAdUnits(pb, adsSlots) {
      this.schedulePrebidAction(pb, "set ad unit", () => {
        log("pbjs", "remove and add ad units");
        adsSlots.forEach(slot => pb.removeAdUnit(slot.code));
        // TODO: check for clone
        pb.addAdUnits(adsSlots);
      });
    },
    configureApstag() {
      // NOTE: this is Amazon code, change it carefully
      window.apstag = {
        init() {
          this.addToQueue("i", arguments); // eslint-disable-line prefer-rest-params
        },
        fetchBids() {
          this.addToQueue("f", arguments); // eslint-disable-line prefer-rest-params
        },
        setDisplayBids() {},
        targetingKeys() {
          return [];
        },
        addToQueue(action, d) {
          this._Q.push([action, d]); // eslint-disable-line no-underscore-dangle
        },
        _Q: []
      };
    },
    initApstag(amazonAccountID, timeout) {
      log(
        "amazon",
        `init apstag with amazonAccountID:${amazonAccountID} and timeout ${
          timeout
        }`
      );
      window.apstag.init({
        pubID: amazonAccountID,
        adServer: "googletag",
        bidTimeout: timeout
      });
    },
    getAmazonConfig(adSlots, networkId, adUnit, section) {
      log(
        "amazon",
        `getAmazonConfig adUnit:${adUnit} networkId:${networkId} section:${
          section
        }`
      );
      const adUnitPathParts = [networkId, adUnit];
      if (section) {
        adUnitPathParts.push(section);
      }
      const adUnitPath = this.getAdUnitPath(adUnitPathParts);
      return adSlots.map(slot => ({
        slotID: slot.code,
        slotName: adUnitPath,
        sizes: slot.sizes
      }));
    },
    scheduleRequestAmazonBids(
      adsSlots,
      amazonPudID,
      networkId,
      adUnit,
      section
    ) {
      return new Promise(resolve => {
        const amazonSlots = this.getAmazonConfig(
          adsSlots,
          networkId,
          adUnit,
          section
        );
        log(
          "amazon",
          `schedule request Amazon bids with slots: ${JSON.stringify(
            amazonSlots
          )}`
        );
        window.apstag.fetchBids({ slots: amazonSlots }, aBids => {
          log("amazon", `bids loaded ${JSON.stringify(aBids)}`);
          resolve(aBids);
        });
      });
    },
    requestPrebidBids(pb, slots) {
      return new Promise(resolve => {
        this.schedulePrebidAction(pb, "request bid", () => {
          this.setAdUnits(pb, slots);
          log("pbjs", "requesting bids");
          pb.requestBids({
            bidsBackHandler(bids) {
              log("pbjs", "bids are loaded or timeout");
              resolve(bids);
            }
          });
        });
      });
    },
    configurePrebid(prebid, prebidOptions) {
      log(
        "pbjs",
        `configure prebid with timeout:${
          prebidOptions.timeout
        } and settings:${JSON.stringify(prebidOptions.bidderSettings)}`
      );
      prebid.bidderTimeout = prebidOptions.timeout; // eslint-disable-line no-param-reassign
      prebid.bidderSettings = prebidOptions.bidderSettings; // eslint-disable-line no-param-reassign
    },
    scheduleGPTConfiguration(gtag, pageTargeting) {
      this.scheduleGPTAction(gtag, "set page targeting", () => {
        log("gpt", "set page targeting");
        const pubads = gtag.pubads();
        Object.entries(pageTargeting || {}).forEach(entry =>
          pubads.setTargeting(entry[0], entry[1])
        );
      });
      this.scheduleGPTAction(gtag, "configuration", () => {
        log("gpt", `configure gpt`);
        const pubads = gtag.pubads();
        pubads.disableInitialLoad();
        // Fetch multiple ads at the same time
        pubads.enableSingleRequest();
        // Enable all GPT services that have been defined for ad slots
        gtag.enableServices();
        gtag
          .pubads()
          .addEventListener("slotRenderEnded", event =>
            log("gpt", `event: slot render ended ${event.slot}`)
          );
        gtag
          .pubads()
          .addEventListener("impressionViewable", event =>
            log("gpt", `event: impression is considered viewable ${event.slot}`)
          );
        gtag
          .pubads()
          .addEventListener("slotOnload", event =>
            log("gpt", `event: load event from iframe ${event.slot}`)
          );
      });
    },
    scheduleGrapeshotTargeting(gtag) {
      this.scheduleGPTAction(gtag, "grapeshot targeting", () => {
        log(
          "gpt",
          `set grapeshot page level targeting with:${window.gs_channels}`
        );
        gtag.pubads().setTargeting("gs_cat", window.gs_channels);
      });
    },
    dfpReady(gtag) {
      return new Promise(resolve =>
        this.scheduleGPTAction(gtag, "ready", () => {
          log("gpt", "googletag ready");
          resolve("googletag ready");
        })
      );
    },
    applyPrebidTargeting(pb) {
      try {
        pb.enableSendAllBids();
        pb.setTargetingForGPTAsync();
      } catch (ex) {
        console.error("Set Targeting for GTP Async with prebid failed:", ex);
      }
    },
    applyAmazonTargeting(ap) {
      try {
        if (ap) {
          ap.setDisplayBids();
        }
      } catch (exception) {
        console.error(
          "Set Targeting for GPT Async with amazon failed:",
          exception
        );
      }
    },
    displayAds(gtag, pb, ap) {
      log("verbose", "displayAds");
      this.applyPrebidTargeting(pb);
      this.applyAmazonTargeting(ap);
      log("gpt", "googletag refresh called");
      gtag.pubads().refresh();
    },
    scheduleSlotDefine(
      gtag,
      adWrapper,
      networkId,
      adUnit,
      section,
      slotConfig,
      slotTargeting
    ) {
      this.scheduleGPTAction(gtag, "define slot", () => {
        const adUnitPath = `/${networkId}/${adUnit}/${section}`;
        const { pos: containerID, sizes, mappings } = slotConfig;
        const slot = gtag.defineSlot(adUnitPath, sizes, containerID);
        if (!slot) {
          throw new Error(
            `Ad slot ${containerID} ${
              adUnitPath
            } could not be defined, probably it was already defined`
          );
        }
        window.adsSlot.push(slot);
        slot.addService(gtag.pubads());
        log(
          "gpt",
          `Define a new slot adUnitPath:${adUnitPath} with div#id ${
            containerID
          }`
        );
        // eslint-disable-next-line no-param-reassign
        adWrapper.innerHTML = `
            <div
              id="${containerID}"
              style="display: table-cell; vertical-align: middle"
            ></div>
          `;
        adWrapper.id = `wrapper-${containerID}`; // eslint-disable-line no-param-reassign
        adWrapper.style.display = "table"; // eslint-disable-line no-param-reassign
        adWrapper.style.margin = "0 auto"; // eslint-disable-line no-param-reassign

        const gptMapping = gtag.sizeMapping();
        mappings.forEach(size =>
          gptMapping.addSize([size.width, size.height], size.sizes)
        );
        slot.defineSizeMapping(gptMapping.build());
        Object.entries(slotTargeting || {}).forEach(entry =>
          slot.setTargeting(entry[0], entry[1])
        );
        log("verbose", `googletag display ${containerID}`);
        gtag.display(containerID);
        // TODO: probably we should move this callback inside slotRenderEnded event handler
        // this callback update the Ad component setting the height
        renderComplete();
      });
    },
    initGlobals() {
      window.adsSlot = [];
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      window.pbjs = {};
      window.pbjs.que = window.pbjs.que || [];
    },
    init() {
      const {
        config: slotConfig,
        networkId,
        adUnit,
        prebidConfig,
        section,
        slots,
        pageTargeting,
        slotTargeting
      } = data;
      log(
        "verbose",
        `init for slot:${data.pos} initCalled:${window.initCalled}`
      );
      if (!window.initCalled) {
        window.initCalled = true;
        this.initGlobals();
        this.scheduleGPTAction(window.googletag, "processing", () =>
          log("gpt", "loaded, processing the queue")
        );
        this.schedulePrebidAction(window.pbjs, "processing", () =>
          log("pbjs", "loaded, processing the queue")
        );
        const amazonAccountID = prebidConfig.bidders.amazon.accountId;
        const biddingActions = [];
        this.configurePrebid(window.pbjs, prebidConfig);
        // Enable Amazon Bidding
        if (amazonAccountID) {
          this.configureApstag();
          this.initApstag(amazonAccountID, prebidConfig.timeout);
          // FIXME: at the moment we configure the amazon bids with just one slot (the first one)
          // because we call init just one time (window.initCalled)
          biddingActions.push(
            this.scheduleRequestAmazonBids(
              slots,
              amazonAccountID,
              networkId,
              adUnit,
              section
            )
          );
        }
        this.scheduleGPTConfiguration(window.googletag, pageTargeting);
        biddingActions.push(
          this.dfpReady(window.googletag),
          this.requestPrebidBids(window.pbjs, slots)
        );
        Promise.all(biddingActions)
          .then(
            this.displayAds.bind(
              this,
              window.googletag,
              window.pbjs,
              window.apstag
            )
          )
          .catch(err => console.error("error loading the ads", err));
      }
      this.scheduleSlotDefine(
        window.googletag,
        el,
        networkId,
        adUnit,
        section,
        slotConfig,
        slotTargeting
      );
    },
    scriptsLoaded() {
      // at this point all the scripts are loaded (eg: pbjs, googletag, apstag)
      // we call this function multiple times, one for each ad
      log("verbose", `scripts loaded ${window.globalAdInitComplete}`);
      if (!window.globalAdInitComplete) {
        window.globalAdInitComplete = true;
        this.scheduleGrapeshotTargeting(window.googletag);
      }
    }
  };
};

export default adInit;
