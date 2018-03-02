/* eslint-env browser */

// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

const adInit = args => {
  const { el, data, window, renderComplete, platform, eventCallback } = args;

  /*
  Code that we're importing from render and isn't tested in render we can treat
  as a blob and run it. Prebidding is a good example. Good code coverage required,
  but the tests don't need to do a detailed verification of behaviour.

  Code that we wrote we should be tested in more detail. For example, we need decent
  tests around "we will delay the ad reqest for up to a second for grapeshot to
  load, and up to 3 seconds for prebidding to complete"

  Refactors that are required to be able to cleanly write tests are essential.
  */




  // const initialiser = {
  //   utils: {
  //     loadScript(uri) {
  //       // insert into head first time only
  //       // return promise that resolves on either load or error - both are valid resolutions, there is no rejection.
  //     },

  //     withTimeout(promise, timeout) {
  //       // Wrap `promise` and resolve it anyway if it has not resolved or rejected within the timeout
  //     }
  //   },

  //   gpt: {
  //     scheduleAction(action) {},

  // scheduleSetPageTargetingValues(keyValuePairs) {
  //   this.scheduleAction(() => {
  //     for (let keyName in keyValuePairs) {
  //       gtag.pubads().setTargeting(keyName, keyValuePairs[keyName]);
  //     }
  //   })
  // }
  //   },

  //   grapeshot: {
  //     initialiseGrapeshotAsync(utils) {
  //       return utils
  //         .loadScript(GRAPESHOT_SCRIPT_URI)
  //         .then(this.doRemainingSetup);
  //     },

  //     doRemainingSetup() {
  //       // return promise
  //     }
  //   },

  // init() {
  //   const { withTimeout } = this.utils;
  //   Promise.all(
  //     withTimeout(setupGrapeshot, 1000),
  //     withTimeout(setupPrebidding, 3000)
  //   )
  //     .then(sendGPTRequest);


  //   setupGrapeshot()
  //   const { withTimeout } = this.utils;
  //   withTimeout(setupPrebidding, 3000)
  //     .then(sendGPTRequest);
  // }
  // };

  // const setupGrapeshot = () => {
  //   return loadScript(GS_SCRIPT_URI)
  //     .then(() => {
  //       gtag.pubads().setTargeting("gs_cat", window.gs_channels);
  //     });
  // }

  // const setupAmazon = () => {
  //   loadScript(AMAZON_SCRIPT_URI);
  //   return new Promise((resolve, reject) => {
  //     amazonQueue.push(() => {
  //       resolve();
  //     })
  //   });
  // }

  const scriptsInserted = {};


  const initialiser = {


    utils: {
      loadScript(scriptUri) {
        if (scriptsInserted[scriptUri]) {
          throw new Error(`Inserting "${scriptUri}" twice.`);
        }
        scriptsInserted[scriptUri] = true;
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = scriptUri;
          script.defer = true;
          document.head.appendChild(script);
          script.addEventListener("load", () => {
            resolve();
          });
          script.addEventListener("error", () => {
            reject();
          });
        })
      }
    },

    gpt: {

      setupGPT(utils) {
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
        return utils.loadScript("https://www.googletagservices.com/tag/js/gpt.js");
      },

      scheduleAction(action) {
        window.googletag.cmd.push(action);
      },

      scheduleSetPageTargetingValues(keyValuePairs) {
        this.scheduleAction(() => {
          const pubads = window.googletag.pubads();
          for (let keyName in keyValuePairs) {
            pubads.setTargeting(keyName, keyValuePairs[keyName]);
          }
        })
      },

      waitUntilReady() {
        return new Promise(resolve =>
          this.scheduleAction(() => {
            resolve();
          })
        );
      },
    },

    prebid: {
      // TODO rename to loadPrebidScripts
      setupPrebid(prebidConfig, utils) {
        window.pbjs = window.pbjs || {};
        window.pbjs.que = window.pbjs.que || [];
        const scriptPromises = [
          utils.loadScript("https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js")
        ];
        if (prebidConfig.bidders.amazon.accountId) {
          scriptPromises.push(utils.loadScript("https://c.amazon-adsystem.com/aax2/apstag.js"))
        }
        return Promise.all(scriptPromises);
      },

      // TODO rename to someting better
      initialize(prebidConfig, slots, networkId, adUnit, section, gpt, displayAds) {
        const amazonAccountID = prebidConfig.bidders.amazon.accountId;
        const biddingActions = [];
        window.pbjs.bidderTimeout = prebidConfig.timeout;
        window.pbjs.bidderSettings = prebidConfig.bidderSettings;
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

        biddingActions.push(
          gpt.waitUntilReady(),
          this.requestPrebidBids(slots)
        );
        Promise.all(biddingActions)
          .then(() => {
            displayAds(
              window.googletag,
              window.pbjs,
              window.apstag
            )
          })
          .catch(err => console.error("error loading the ads", err)); // eslint-disable-line no-console
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
          setDisplayBids() { },
          targetingKeys() {
            return [];
          },
          addToQueue(action, d) {
            this._Q.push([action, d]); // eslint-disable-line no-underscore-dangle
          },
          _Q: []
        };
      },
      //TODO merge with configureApstag?
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
          slotID: slot.code,
          slotName: adUnitPath,
          sizes: slot.sizes
        }));
      },
      getAdUnitPath(params) {
        return params.reduce(
          (acc, cur, index) => (index === 1 ? `/${acc}/${cur}` : `${acc}/${cur}`)
        );
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
          window.apstag.fetchBids({ slots: amazonSlots }, aBids => {
            resolve(aBids);
          });
        });
      },
      schedulePrebidAction(action) {
        window.pbjs.que.push(action);
      },
      setAdUnits(adsSlots) {
        this.schedulePrebidAction(() => {
          adsSlots.forEach(slot => window.pbjs.removeAdUnit(slot.code));
          // TODO: check for clone
          window.pbjs.addAdUnits(adsSlots);
        });
      },
      requestPrebidBids(slots) {
        return new Promise(resolve => {
          this.schedulePrebidAction(() => {
            this.setAdUnits(window.pbjs, slots);
            window.pbjs.requestBids({
              bidsBackHandler(bids) {
                resolve(bids);
              }
            });
          });
        });
      },

      applyPrebidTargeting() {
        try {
          console.log("PREBIDDING COMPLETE!", window.pbjs);
          window.pbjs.enableSendAllBids();
          window.pbjs.setTargetingForGPTAsync();
        } catch (ex) {
          console.error("Set Targeting for GTP Async with prebid failed:", ex); // eslint-disable-line no-console
        }
      },
      applyAmazonTargeting() {
        if (window.apstag) {
          console.log("Amazon bids done");
          window.apstag.setDisplayBids();
        }
      },
    },

    grapeshot: {
      setupGrapeshot(gpt, utils) {
        const grapeshotUrl = `https://newscorp.grapeshot.co.uk/thetimes/channels.cgi?url=${encodeURIComponent(
          data.contextUrl
        )}`;
        return utils.loadScript(grapeshotUrl)
          .then(() => {
            console.log("GRAPESHOT COMPLETE!", window.gs_channels);
            gpt.scheduleSetPageTargetingValues({ gs_cat: window.gs_channels });
          })
          .catch(() => {
            gpt.scheduleSetPageTargetingValues({ gs_cat: ["default"] });
          })
      },
    },



    //
    // ABANDON HOPE BELOW HERE
    //






    //TODO delete
    scheduleGPTAction(gtag, label, action) {
      gtag.cmd.push(action);
    },
    scheduleGPTConfiguration(gtag, pageTargeting) {
      this.scheduleGPTAction(gtag, "set page targeting ok", () => {
        const pubads = gtag.pubads();
        Object.entries(pageTargeting || {}).forEach(entry =>
          pubads.setTargeting(entry[0], entry[1])
        );
      });
      this.scheduleGPTAction(gtag, "configuration", () => {
        const pubads = gtag.pubads();
        pubads.disableInitialLoad();
        // Fetch multiple ads at the same time
        pubads.enableSingleRequest();
        // Enable all GPT services that have been defined for ad slots
        gtag.enableServices();
        // gtag
        //   .pubads()
        //   .addEventListener("slotRenderEnded", event =>
        //     log("gpt", `event: slot render ended ${event.slot}`)
        //   );
      });
    },
    displayAds() {
      if (platform === "web") {
        this.prebid.applyPrebidTargeting();
        this.prebid.applyAmazonTargeting();
      }
      window.googletag.pubads().refresh();
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
        /* eslint-disable no-param-reassign */
        adWrapper.id = `wrapper-${containerID}`;
        adWrapper.innerHTML = `<div id="${containerID}"></div>`;
        adWrapper.style.display = "flex";
        adWrapper.style.alignItems = "center";
        adWrapper.style.justifyContent = "center";
        adWrapper.style.margin = "0 auto";
        /* eslint-enable no-param-reassign */

        const gptMapping = gtag.sizeMapping();
        mappings.forEach(size =>
          gptMapping.addSize([size.width, size.height], size.sizes)
        );
        slot.defineSizeMapping(gptMapping.build());
        Object.entries(slotTargeting || {}).forEach(entry =>
          slot.setTargeting(entry[0], entry[1])
        );
        gtag.display(containerID);
        // TODO: probably we should move this callback inside slotRenderEnded event handler
        // this callback update the Ad component setting the height
        renderComplete();
      });
    },
    initGlobals() {
      window.adsSlot = [];
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
      if (!window.initCalled) {

        window.initCalled = true;
        this.initGlobals();

        Promise.all([
          this.gpt.setupGPT(this.utils),
          this.grapeshot.setupGrapeshot(this.gpt, this.utils),
          // only setup on web
          this.prebid.setupPrebid(prebidConfig, this.utils)
        ]);


        if (platform === "web") {
          //TODO rationalise arguments
          this.prebid.initialize(
            prebidConfig,
            slots,
            networkId,
            adUnit,
            section,
            this.gpt,
            this.displayAds.bind(this)
          );
        } else {
          this.dfpReady(window.googletag).then(
            this.displayAds.bind(this)
          );
        }

        this.scheduleGPTConfiguration(window.googletag, pageTargeting);
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
  };

  // uncomment this to enable logging of ad initialisation logic
  // NOTE: do not delete this code, it's super-useful for the next person who needs to debug ads on native
  // for (let groupName in initialiser) {
  //   let group = initialiser[groupName];
  //   for (let methodName in group) {
  //     let method = group[methodName];
  //     group[methodName] = function () {
  //       const args = Array.prototype.slice.call(arguments);
  //       console.log(`ad-init: ${groupName}.${methodName}`, ...args);
  //       eventCallback("log", `ad-init: ${groupName}.${methodName}(${args.join(", ")})`);
  //       return method.apply(this, args);
  //     };
  //   }
  // }

  return initialiser;
};

export default adInit;
