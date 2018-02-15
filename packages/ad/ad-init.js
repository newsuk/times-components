/* eslint-env browser */

// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

const setPrebidConfig = (prebid, prebidOptions) => {
  prebid.bidderTimeout = prebidOptions.timeout; // eslint-disable-line no-param-reassign
  prebid.bidderSettings = prebidOptions.bidderSettings; // eslint-disable-line no-param-reassign
};

const setGrapeshotTargeting = (gtag, values) => {
  gtag.cmd.push(() => {
    // log("[googletag] set grapeshot targeting:", values);
    gtag.pubads().setTargeting("gs_cat", values);
  });
};

const configureGPT = (gtag, pageTargeting) => {
  gtag.cmd.push(() => {
    // log("[googletag] configureGPT:", pageTargeting);
    const pubads = gtag.pubads();
    Object.entries(pageTargeting || {}).forEach(entry =>
      pubads.setTargeting(entry[0], entry[1])
    );
    pubads.disableInitialLoad();
    // Fetch multiple ads at the same time
    pubads.enableSingleRequest();
    // Enable all GPT services that have been defined for ad slots
    gtag.enableServices();
    // TODO
    // gtag
    //   .pubads()
    //   .addEventListener("slotRenderEnded", evt =>
    //     log("slotRenderEnded", evt)
    //   );
    // TODO responsive
  });
};

const adInit = args => {
  const {
    el,
    data,
    window,
    globals: { googletag, gs_channels = "DEFAULT", pbjs }, // eslint-disable-line camelcase
    renderComplete
  } = args;

  let executed = false;
  return {
    getAdUnitPath(params) {
      return params.reduce(
        (acc, cur, index) => (index === 1 ? `/${acc}/${cur}` : `${acc}/${cur}`)
      );
    },
    setupApstag() {
      if (window.apstag) return;
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
    configureApstag(amazonAccountID, timeout) {
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
    requestAmazonBids(adsSlots, amazonPudID, networkId, adUnit, section) {
      return new Promise(resolve => {
        if (!amazonPudID) {
          return resolve("amazon bidding disabled");
        }
        window.apstag.fetchBids(
          { slots: this.getAmazonConfig(adsSlots, networkId, adUnit, section) },
          () => resolve("amazon bids loaded")
        );
      });
    },
    setAdUnits(pb, adsSlots) {
      pb.que.push(() => {
        adsSlots.forEach(slot => pb.removeAdUnit(slot.code));
        // TODO check for clone
        pb.addAdUnits(adsSlots);
      });
    },
    requestPrebidBids(pb) {
      return new Promise(resolve => {
        pb.que.push(() => {
          this.setAdUnits(pb, pos);
          pb.requestBids({
            bidsBackHandler() {
              resolve();
            }
          });
        });
      });
    },
    dfpReady(gtag) {
      return new Promise(resolve => gtag.cmd.push(resolve));
    },
    applyPrebidTargeting(pb) {
      try {
        pb.enableSendAllBids();
        pb.setTargetingForGPTAsync();
      } catch (ex) {
        console.error("Set Targeting for GTP Async with prebid failed:", ex);
      }
    },
    applyAmazonTargeting() {
      try {
        if (window.apstag) {
          window.apstag.setDisplayBids();
        }
      } catch (exception) {
        console.error(
          "Set Targeting for GPT Async with amazon failed:",
          exception
        );
      }
    },
    displayAds(gtag) {
      // applyPrebidTargeting
      // applyAmazonTargeting
      this.applyAmazonTargeting();
      this.applyPrebidTargeting();
      gtag.pubads().refresh();

      // gtag.cmd.push(() => {
      //   // log("[googletag] displayAds on element:", elementId);
      //   // gtag.display(elementId);
      //   gtag.pubads().refresh();
      // });
    },
    pageInit() {
      setGrapeshotTargeting(googletag, gs_channels);
      configureGPT(googletag, data.pageTargeting);
      window.setTimeout(() => displayAds(googletag, data.config.code), 0);
    },

    slotInit() {
      googletag.cmd.push(() => {
        const slotName = `/${data.networkId}/${data.adUnit}/${data.pos}`;

        const slot = googletag.defineSlot(
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
        slot.addService(googletag.pubads());

        el.innerHTML = `
          <div
            id="${data.pos}"
            style="display: table-cell; vertical-align: middle"
          ></div>
        `;
        el.style.display = "table";
        el.style.margin = "0 auto";

        const mapping = googletag.sizeMapping();
        data.sizingMap.forEach(size =>
          mapping.addSize([size.width, size.height], size.sizes)
        );
        slot.defineSizeMapping(mapping.build());

        Object.entries(data.slotTargeting || {}).forEach(entry =>
          slot.setTargeting(entry[0], entry[1])
        );

        renderComplete();
      });
    },
    prebidding() {
      const { networkId, adUnit, prebidConfig, section, slots } = data;
      const amazonAccountID = prebidConfig.bidders.amazon.accountId;
      if (amazonAccountID) {
        this.setupApstag();
        this.configureApstag(amazonAccountID, prebidConfig.timeout);
      }

      setPrebidConfig(pbjs, prebidConfig);
      this.setAdUnits(pbjs, slots);
      this.requestPrebidBids(pbjs).then(res => console.log("prebid bids", res));
      Promise.all([
        this.dfpReady(),
        this.requestPrebidBids(pbjs),
        this.requestAmazonBids(
          slots,
          amazonAccountID,
          networkId,
          adUnit,
          section
        )
      ])
        .then(this.displayAds)
        .catch(err => console.error("error loading the ads", err));

      this.pageInit();
    },
    execute() {
      if (executed) throw new Error("execute() has already been called");
      executed = true;
      if (!window.globalAdInitComplete) {
        window.globalAdInitComplete = true;
        this.prebidding();
      }
      this.slotInit();
    }
  };
};

export default adInit;
