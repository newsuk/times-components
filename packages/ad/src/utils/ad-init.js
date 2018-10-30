/* eslint-env browser */

// NOTE: this function must be self-contained, i.e. contain no references to variables
// defined outside the function, so that it can be passed into a WebView.

const adInit = args => {
  const { el, data, platform, eventCallback, window } = args;
  const { document, setTimeout, Promise } = window;

  const scriptsInserted = {};
  let initCalled = false;
  let hasScriptLoadingError = false;

  const initialiser = {
    destroySlots() {
      this.gpt.destroySlots();
    },

    doPageAdSetupAsync() {
      const { networkId, adUnit, prebidConfig, section, slots } = data;
      const parallelActions = [
        this.gpt.setupAsync(this.utils),
        this.grapeshot.setupAsync(this.gpt, this.utils)
      ];
      const enablePrebidding = platform === "web";

      if (enablePrebidding) {
        parallelActions.push(
          this.prebid.setupAsync(prebidConfig, this.utils),
          this.prebid.requestBidsAsync(
            prebidConfig,
            slots,
            networkId,
            adUnit,
            section,
            this.gpt
          )
        );
      }

      if (platform === "web" && window.matchMedia) {
        Object.keys(this.utils.breakpoints).forEach(b => {
          window
            .matchMedia(this.utils.breakpoints[b])
            .addListener(this.handleBreakpointChange.bind(this, b));
        });
      }

      return Promise.all(parallelActions)
        .then(this.gpt.waitUntilReady.bind(this.gpt))
        .then(this.finaliseAds.bind(this, enablePrebidding));
    },

    finaliseAds(enablePrebidding) {
      if (enablePrebidding) {
        this.prebid.applyPrebidTargeting();
        this.prebid.applyAmazonTargeting();
      }
    },

    gpt: {
      destroySlots() {
        if (window.googletag.destroySlots) {
          window.googletag.destroySlots();
          return true;
        }

        return false;
      },

      displayAds() {
        window.googletag.pubads().refresh();
      },

      doSlotAdSetup() {
        const {
          config: slotConfig,
          networkId,
          adUnit,
          section,
          slotTargeting
        } = data;
        this.scheduleAction(() => {
          const adUnitPath = `/${networkId}/${adUnit}/${section}`;
          const { slotName, sizes, mappings } = slotConfig;
          const slot = window.googletag.defineSlot(adUnitPath, sizes, slotName);

          if (!slot) {
            throw new Error(
              `Ad slot ${slotName} ${adUnitPath} could not be defined, probably it was already defined`
            );
          }

          slot.addService(window.googletag.pubads());
          /* eslint-disable no-param-reassign */

          el.id = `wrapper-${slotName}`;
          el.innerHTML = `<div id="${slotName}"></div>`;
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.margin = "0 auto";
          el.style.height = "100%";
          /* eslint-enable no-param-reassign */

          const gptMapping = window.googletag.sizeMapping();
          mappings.forEach(size =>
            gptMapping.addSize([size.width, size.height], size.sizes)
          );
          slot.defineSizeMapping(gptMapping.build());
          Object.keys(slotTargeting || []).forEach(key =>
            slot.setTargeting(key, slotTargeting[key])
          );
          const randomTestingGroup = Math.floor(Math.random() * 10).toString();
          slot.setTargeting("timestestgroup", randomTestingGroup);
          slot.setTargeting("pos", slotName);
          window.googletag.display(slotName);
          window.googletag.pubads().refresh();
        });
      },

      scheduleAction(action) {
        window.googletag.cmd.push(action);
      },

      scheduleSetPageTargetingValues(keyValuePairs) {
        this.scheduleAction(() => {
          const pubads = window.googletag.pubads();
          Object.keys(keyValuePairs).forEach(key => {
            pubads.setTargeting(key, keyValuePairs[key]);
          });
        });
      },

      setupAsync(utils) {
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
        this.scheduleSetPageTargetingValues(data.pageTargeting);
        this.scheduleAction(() => {
          const pubads = window.googletag.pubads();
          pubads.disableInitialLoad();
          pubads.enableSingleRequest();
          window.googletag.enableServices();
        });
        return utils.loadScript(
          "https://www.googletagservices.com/tag/js/gpt.js"
        );
      },

      waitUntilReady() {
        return new Promise(resolve =>
          this.scheduleAction(() => {
            resolve();
          })
        );
      }
    },
    grapeshot: {
      setupAsync(gpt, utils) {
        const grapeshotUrl = `https://newscorp.grapeshot.co.uk/thetimes/channels.cgi?url=${encodeURIComponent(
          data.contextUrl
        )}`;
        return utils
          .loadScript(grapeshotUrl, 1000)
          .then(() => {
            gpt.scheduleSetPageTargetingValues({
              gs_cat: window.gs_channels
            });
          })
          .catch(() => {
            // allow grapeshot to error or time out silently
          });
      }
    },

    handleBreakpointChange(breakpoint, mql) {
      if (mql.matches) {
        this.gpt.scheduleSetPageTargetingValues({
          breakpoint,
          refresh: "true"
        });
        this.gpt.scheduleAction(() => this.gpt.displayAds());
      }
    },

    init() {
      if (initCalled) {
        throw new Error("init() has already been called");
      }

      initCalled = true;

      if (!window.initCalled) {
        window.initCalled = true;
        this.doPageAdSetupAsync();
      }

      this.gpt.doSlotAdSetup();
      this.gpt.waitUntilReady().then(() => {
        if (hasScriptLoadingError) {
          this.destroySlots();
          return eventCallback("scriptLoadingError");
        }

        return eventCallback("renderComplete");
      });
    },

    prebid: {
      applyAmazonTargeting() {
        if (window.apstag) {
          window.apstag.setDisplayBids();
        }
      },

      applyPrebidTargeting() {
        window.pbjs.enableSendAllBids();
        window.pbjs.setTargetingForGPTAsync();
      },

      createPbjsGlobals() {
        window.pbjs = window.pbjs || {};
        window.pbjs.que = window.pbjs.que || [];
      },

      getAdUnitPath(params) {
        return params.reduce(
          (acc, cur, index) =>
            index === 1 ? `/${acc}/${cur}` : `${acc}/${cur}`
        );
      },

      getAmazonConfig(adSlots, networkId, adUnit, section) {
        const adUnitPathParts = [networkId, adUnit];

        if (section) {
          adUnitPathParts.push(section);
        }

        const adUnitPath = this.getAdUnitPath(adUnitPathParts);
        return adSlots.map(slot => ({
          sizes: slot.sizes,
          slotID: slot.code,
          slotName: adUnitPath
        }));
      },

      requestBidsAsync(prebidConfig, slots, networkId, adUnit, section, gpt) {
        const amazonAccountID =
          prebidConfig.bidders.amazon && prebidConfig.bidders.amazon.accountId;
        const biddingActions = [];
        window.pbjs.bidderTimeout = prebidConfig.timeout;
        window.pbjs.bidderSettings = prebidConfig.bidderSettings(prebidConfig);

        if (amazonAccountID) {
          this.setupApstag(amazonAccountID, prebidConfig.timeout); // FIXME: at the moment we configure the amazon bids with just one slot (the first one)
          // because we call init just one time (window.initCalled)
          // to be fixed in REPLAT-1370

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

      requestPrebidBids(slots) {
        return new Promise(resolve => {
          this.schedulePrebidAction(() => {
            this.setAdUnits(slots);
            window.pbjs.requestBids({
              bidsBackHandler(bids) {
                resolve(bids);
              }
            });
          });
        });
      },

      schedulePrebidAction(action) {
        window.pbjs.que.push(action);
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
          window.apstag.fetchBids(
            {
              slots: amazonSlots
            },
            aBids => {
              resolve(aBids);
            }
          );
        });
      },

      setAdUnits(adsSlots) {
        this.schedulePrebidAction(() => {
          adsSlots.forEach(slot => window.pbjs.removeAdUnit(slot.code));
          window.pbjs.addAdUnits(adsSlots);
        });
      },

      setupApstag(amazonAccountID, timeout) {
        // NOTE: this is Amazon code, change it carefully
        window.apstag = {
          _Q: [],

          addToQueue(action, d) {
            this._Q.push([action, d]); // eslint-disable-line no-underscore-dangle
          },

          fetchBids() {
            this.addToQueue("f", arguments); // eslint-disable-line prefer-rest-params
          },

          init() {
            this.addToQueue("i", arguments); // eslint-disable-line prefer-rest-params
          },

          setDisplayBids() {},

          targetingKeys() {
            return [];
          }
        };
        window.apstag.init({
          adServer: "googletag",
          bidTimeout: timeout,
          pubID: amazonAccountID
        });
      },

      setupAsync(prebidConfig, utils) {
        this.createPbjsGlobals();
        const scriptPromises = [
          utils.loadScript(
            "https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js"
          )
        ];

        if (
          prebidConfig.bidders.amazon &&
          prebidConfig.bidders.amazon.accountId
        ) {
          scriptPromises.push(
            utils.loadScript("https://c.amazon-adsystem.com/aax2/apstag.js")
          );
        }

        return Promise.all(scriptPromises);
      }
    },
    utils: {
      breakpoints: {
        huge: "(min-width: 1320px)",
        medium: "(min-width: 768px) and (max-width: 1023px)",
        small: "(max-width: 767px)",
        wide: "(min-width: 1024px) and (max-width: 1319px)"
      },

      createScriptElement(scriptUri, onLoad, onError) {
        try {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.defer = true;
          if (onLoad) script.addEventListener("load", onLoad);
          if (onError) script.addEventListener("error", onError);
          script.src = scriptUri;
          document.head.appendChild(script);
        } catch (e) {
          eventCallback(
            "log",
            `Could not insert script "${scriptUri}" (${e}) - could be caused by ad blocker`
          );
        }
      },

      loadScript(scriptUri, timeout) {
        if (scriptsInserted[scriptUri]) {
          throw new Error(`Inserting "${scriptUri}" twice.`);
        }

        scriptsInserted[scriptUri] = true;
        return new Promise((resolve, reject) => {
          this.createScriptElement(
            scriptUri,
            () => {
              resolve();
            },
            () => {
              hasScriptLoadingError = true;
              reject(new Error(`load error for ${scriptUri}`));
            }
          );

          if (timeout) {
            setTimeout(reject, timeout, new Error(`timeout for ${scriptUri}`));
          }
        });
      }
    }
  };

  // uncomment this to enable logging of ad initialisation logic - every method
  // call will be logged
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
