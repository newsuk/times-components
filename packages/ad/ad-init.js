/* eslint-env browser */

// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

const adInit = args => {
  const {
    el,
    data,
    window,
    globals // : { googletag, gs_channels = "DEFAULT", pbjs, apstag }, // eslint-disable-line camelcase
    // renderComplete
  } = args;

  let executed = false;
  const logTypes = ["amazon", "gpt", "pbjs", "verbose"];
  const log = (type, message) => {
    if (!logTypes.includes(type) || process.env.NODE_ENV === "production")
      return;
    console.log(`${type}: ${message}`); // eslint-disable-line no-console
  };
  return {
    scheduleGPTAction(gtag, label, action) {
      gtag.cmd.push(action);
      log(
        "verbose",
        `gpt: schedule gpt action:${label}. actions in queue:${gtag.cmd.length}`
      );
    },
    schedulePrebidAction(pb, label, action) {
      pb.que.push(action);
      log(
        "verbose",
        `prebid: schedule prebid action:${label}. actions in queue:${
          pb.que.length
        }`
      );
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
        // TODO check for clone
        pb.addAdUnits(adsSlots);
      });
    },
    configureApstag() {
      // NOTE: this is Amazon code, change it carefully
      window.apstag = {
        init() {
          log("amazon", "calling init");
          this.addToQueue("i", arguments); // eslint-disable-line prefer-rest-params
        },
        fetchBids() {
          log("amazon", "calling fetchBids");
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
        const amazonSlots = this.getAmazonConfig(adsSlots, networkId, adUnit, section);
        log("amazon", `request Amazon bids with slot ${JSON.stringify(amazonSlots)}`)
        window.apstag.fetchBids(
          { slots: amazonSlots},
          aBids => {
            log("amazon", `bids loaded ${JSON.stringify(aBids)}`);
            resolve(aBids);
          }
        );
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
        log("gpt", `set page targeting with:${JSON.stringify(pageTargeting)}`);
        const pubads = gtag.pubads();
        Object.entries(pageTargeting || {}).forEach(entry =>
          pubads.setTargeting(entry[0], entry[1])
        );
      });
      this.scheduleGPTAction(gtag, "configuration", () => {
        log("gpt", `configuring`);
        const pubads = gtag.pubads();
        pubads.disableInitialLoad();
        // Fetch multiple ads at the same time
        pubads.enableSingleRequest();
        // Enable all GPT services that have been defined for ad slots
        gtag.enableServices();
        gtag
          .pubads()
          .addEventListener("slotRenderEnded", event =>
            log("gpt", `slot render ended ${event.companyIds}`)
          );
      });
    },
    scheduleGrapeshotTargeting(gtag) {
      this.scheduleGPTAction(gtag, "grapeshot targeting", () => {
        log(
          "gpt",
          `set grapeshot page level targeting with:${globals.gs_channels} ${
            gtag.pubads
          }`
        );
        gtag.pubads().setTargeting("gs_cat", globals.gs_channels);
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
      this.applyAmazonTargeting(ap);
      this.applyPrebidTargeting(pb);
      gtag.pubads().refresh();
    },
    scheduleSlotInit(gtag, adWrapper, networkId, adUnit, pos, adsData) {
      this.scheduleGPTAction(gtag, "configure slot", () => {
        const adUnitPath = `/${networkId}/${adUnit}/${pos}`;
        const containerID = adsData.config.pos;
        const slot = gtag.defineSlot(
          adUnitPath,
          adsData.config.sizes,
          containerID
        );
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
          `Define a new slot adUnitPath:${adUnitPath} with div id ${
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
        adWrapper.style.display = "table"; // eslint-disable-line no-param-reassign
        adWrapper.style.margin = "0 auto"; // eslint-disable-line no-param-reassign

        const mapping = gtag.sizeMapping();
        adsData.sizingMap.forEach(size =>
          mapping.addSize([size.width, size.height], size.sizes)
        );
        slot.defineSizeMapping(mapping.build());
        // set slot targeting
        Object.entries(adsData.slotTargeting || {}).forEach(entry =>
          slot.setTargeting(entry[0], entry[1])
        );
        // TODO to check if we need renderComplete
        // renderComplete();
      });
    },
    init() {
      const {
        pos,
        networkId,
        adUnit,
        prebidConfig,
        section,
        slots,
        pageTargeting
      } = data;

      if (!window.initCalled) {
        window.initCalled = true;
        window.adsSlot = [];
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
        window.pbjs = {};
        window.pbjs.que = window.pbjs.que || [];
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
      this.scheduleSlotInit(window.googletag, el, networkId, adUnit, pos, data);
    },
    scriptsLoaded() {
      // at this point all the scripts are loaded (eg: pbjs, googletag, apstag)
      // we call this function multiple times, one for each ad
      if (executed) throw new Error("execute() has already been called");
      executed = true;
      if (!window.globalAdInitComplete) {
        window.globalAdInitComplete = true;
        // call for each ad
      }
    }
  };
};

export default adInit;
