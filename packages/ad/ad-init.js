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

  return {
    getAdUnitPath(params) {
      return params.reduce(
        (acc, cur, index) => (index === 1 ? `/${acc}/${cur}` : `${acc}/${cur}`)
      );
    },
    setAdUnits(pb, adsSlots) {
      pb.que.push(() => {
        adsSlots.forEach(slot => pb.removeAdUnit(slot.code));
        // TODO check for clone
        pb.addAdUnits(adsSlots);
      });
    },
    configureApstag() {
      window.apstag = {
        init(i) {
          this.addToQueue(["i", i]);
        },
        fetchBids(i) {
          this.addToQueue(["f", i]);
        },
        setDisplayBids() {},
        targetingKeys() {
          return [];
        },
        addToQueue(item) {
          this._Q.push(item); // eslint-disable-line no-underscore-dangle
        },
        _Q: []
      };
    },
    initApstag(amazonAccountID, timeout) {
      window.apstag.init({
        pubID: amazonAccountID,
        adServer: "googletag",
        bidTimeout: timeout
      });
    },
    getAmazonConfig(adSlots, networkId, adUnit, section) {
      const adUnitPathParts = [networkId, adUnit];
      if (section) {
        adUnitPathParts.push(section);
      }
      const adUnitPath = this.getAdUnitPath(adUnitPathParts);
      return adSlots.map(slot => ({
        slotID: slot.pos,
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
        window.apstag.fetchBids(
          { slots: this.getAmazonConfig(adsSlots, networkId, adUnit, section) },
          () => resolve("amazon bids loaded")
        );
      });
    },
    requestPrebidBids(pb, pos) {
      return new Promise(resolve => {
        pb.que.push(() => {
          // TODO check pos
          this.setAdUnits(pb, pos);
          pb.requestBids({
            bidsBackHandler() {
              resolve();
            }
          });
        });
      });
    },
    configurePrebid(prebid, prebidOptions) {
      console.log(
        "configure prebid with",
        prebidOptions.timeout,
        prebidOptions.bidderSettings
      );
      prebid.bidderTimeout = prebidOptions.timeout; // eslint-disable-line no-param-reassign
      prebid.bidderSettings = prebidOptions.bidderSettings; // eslint-disable-line no-param-reassign
    },
    scheduleGPTConfiguration(gtag, pageTargeting) {
      gtag.cmd.push(() => {
        console.log('scheduleGPTConfiguration', gtag.pubads);
        const pubads = gtag.pubads();
        Object.entries(pageTargeting || {}).forEach(entry =>
          pubads.setTargeting(entry[0], entry[1])
        );
        pubads.disableInitialLoad();
        // Fetch multiple ads at the same time
        pubads.enableSingleRequest();
        // Enable all GPT services that have been defined for ad slots
        gtag.enableServices();
      });
    },
    scheduleGrapeshotTargeting(gtag) {
      gtag.cmd.push(() => {
        console.log('scheduleGrapeshotTargeting', gtag.pubads);

        gtag.pubads().setTargeting("gs_cat", globals.gs_channels);
      });
    },
    dfpReady(gtag) {
      console.log("dfpReady", gtag);
      return new Promise(resolve => gtag.cmd.push(()=> {console.log("jjj");resolve();}));
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
      //debugger;
      console.log('gtag is', gtag);
      gtag.pubads().refresh();
    },
    scheduleSlotInit(gtag, adWrapper, networkId, adUnit, pos) {
      gtag.cmd.push(() => {
        const slotName = `/${networkId}/${adUnit}/${pos}`;

        const slot = gtag.defineSlot(
          slotName,
          data.config.sizes,
          data.config.pos
        );
        if (!slot) {
          throw new Error(
            `Ad slot ${
              slotName
            } could not be defined, probably it was already defined`
          );
        }

        slot.addService(gtag.pubads());

        adWrapper.innerHTML = `
            <div
              id="${data.pos}"
              style="display: table-cell; vertical-align: middle"
            ></div>
          `;
        adWrapper.style.display = "table";
        adWrapper.style.margin = "0 auto";

        const mapping = gtag.sizeMapping();
        data.sizingMap.forEach(size =>
          mapping.addSize([size.width, size.height], size.sizes)
        );
        slot.defineSizeMapping(mapping.build());

        Object.entries(data.slotTargeting || {}).forEach(entry =>
          slot.setTargeting(entry[0], entry[1])
        );
        // TODO to check if we need renderComplete
        // renderComplete();
      });
    },
    // -------------
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

        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];

        window.pbjs = {};
        window.pbjs.que = window.pbjs.que || [];

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
          //new Promise((resolve) => setTimeout(() => resolve(), 15000)),
          this.dfpReady(window.googletag),
          this.requestPrebidBids(window.pbjs, pos)
        );
        Promise.all(biddingActions)
          //.then(this.displayAds(window.googletag, window.pbjs, window.apstag))
          .catch(err => console.error("error loading the ads", err));
      }
      this.scheduleSlotInit(window.googletag, el, networkId, adUnit, pos);
    },
    scriptsLoaded() {
      // at this point all the scripts are loaded (eg: pbjs, googletag, apstag)
      // we call this function multiple times, one for each ad
      // const { networkId, adUnit, prebidConfig, section, slots } = data;
      console.log(
        "[ad-init.js]scriptsLoaded",
        globals.googletag,
        globals.gs_channels,
        globals.pbjs,
        globals.apstag
      );
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
