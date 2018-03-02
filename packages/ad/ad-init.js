/* eslint-env browser */

// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

const adInit = args => {
  const { el, data, window, renderComplete, platform, eventCallback } = args;

  const scriptsInserted = {};


  const initialiser = {


    utils: {
      loadScript(scriptUri, timeout) {
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
            reject(`load error for ${scriptUri}`);
          });
          if (timeout) {
            setTimeout(reject, timeout, `timeout for ${scriptUri}`);
          }
        });
      }
    },

    gpt: {

      setupAsync(utils) {
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
        this.scheduleGPTConfiguration(data.pageTargeting);
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

      scheduleGPTConfiguration(pageTargeting) {
        this.scheduleSetPageTargetingValues(pageTargeting);
        this.scheduleAction(() => {
          const pubads = window.googletag.pubads();
          pubads.disableInitialLoad();
          pubads.enableSingleRequest();
          window.googletag.enableServices();
          // window.googletag
          //   .pubads()
          //   .addEventListener("slotRenderEnded", event =>
          //     log("gpt", `event: slot render ended ${event.slot}`)
          //   );
        });
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
      initGlobals() {
        window.pbjs = window.pbjs || {};
        window.pbjs.que = window.pbjs.que || [];
      },
      loadScriptsAsync(prebidConfig, utils) {
        const scriptPromises = [
          utils.loadScript("https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js")
        ];
        if (prebidConfig.bidders.amazon.accountId) {
          scriptPromises.push(utils.loadScript("https://c.amazon-adsystem.com/aax2/apstag.js"))
        }
        return Promise.all(scriptPromises);
      },

      // TODO rename to someting better
      requestBidsAsync(prebidConfig, slots, networkId, adUnit, section, gpt) {
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
        return Promise.all(biddingActions);
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
      setupAsync(gpt, utils) {
        const grapeshotUrl = `https://newscorp.grapeshot.co.uk/thetimes/channels.cgi?url=${encodeURIComponent(
          data.contextUrl
        )}`;
        return utils.loadScript(grapeshotUrl, 1000)
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
      this.gpt.scheduleAction(() => {
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

        const parallelActions = [
          this.gpt.setupAsync(this.utils),
          this.grapeshot.setupAsync(this.gpt, this.utils),
        ];

        const enablePrebidding = platform === "web";
        if (enablePrebidding) {
          this.prebid.initGlobals();
          parallelActions.push(
            this.prebid.loadScriptsAsync(prebidConfig, this.utils),
            this.prebid.requestBidsAsync(
              prebidConfig,
              slots,
              networkId,
              adUnit,
              section,
              this.gpt
            )
          )
        }

        Promise.all(parallelActions)
          .then(this.gpt.waitUntilReady())
          .then(() => {
            this.displayAds();
          });

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
