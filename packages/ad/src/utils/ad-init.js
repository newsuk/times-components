/* eslint-env browser */
// NOTE: this function must be self-contained, i.e. contain no references to variables
// defined outside the function, so that it can be passed into a WebView.
const adInit = args => {
  const { el, data, platform, eventCallback, window } = args;
  const isWeb = platform === "web";
  const { bidInitialiser } = data;
  const withoutHeaderBidding = isWeb && !bidInitialiser;
  if (!window.googletag || !window.pbjs || !window.apstag) {
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    window.pbjs = window.pbjs || {};
    window.pbjs.que = window.pbjs.que || [];
    window.apstag = window.apstag || {
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
  }
  const { document, setTimeout, Promise, googletag, pbjs, apstag } = window;

  const scriptsInserted = {};
  let initCalled = false;

  return {
    gpt: {
      defineAdSlot(slotConfig) {
        return new Promise(resolve => {
          try {
            this.scheduleAction(() => {
              const { networkId, adUnit, section, slotTargeting } = data;
              const adUnitPath = `/${networkId}/${adUnit}/${section}`;
              const { slotName, sizes, mappings } = slotConfig;
              const slot = googletag.defineSlot(adUnitPath, sizes, slotName);

              this.setSlotTargeting(slot, slotName, mappings, slotTargeting);
              googletag.display(slotName);
              const msg = `[Google] INFO: set slot targeting - ${slotName}`;
              eventCallback("warn", msg);
              resolve(msg);
            });
          } catch (err) {
            eventCallback("error", err.stack);
            resolve(err);
          }
        });
      },

      displayAds() {
        googletag.pubads().refresh();
      },

      doSlotAdSetup() {
        const { pageTargeting, allSlotConfigs, config } = data;
        const setPageTarget = this.scheduleSetPageTargetingValues(
          pageTargeting
        );
        const setSlotTarget = isWeb
          ? allSlotConfigs.map(slot => this.defineAdSlot(slot))
          : this.defineAdSlot(config);
        return Promise.all([setPageTarget, setSlotTarget]);
      },

      gptInitialised() {
        return new Promise(resolve => {
          setTimeout(() => {
            this.scheduleAction(() => {
              if (isWeb) {
                try {
                  pbjs.setTargetingForGPTAsync();
                  const { prebidConfig } = data;
                  const amazonAccountID =
                    prebidConfig.bidders.amazon &&
                    prebidConfig.bidders.amazon.accountId;
                  if (apstag && amazonAccountID) {
                    apstag.setDisplayBids();
                  }
                } catch (err) {
                  eventCallback("error", err.stack);
                }
              }
              googletag.pubads().refresh();
              const msg = "[Google] INFO: displayed ads";
              eventCallback("warn", msg);
              resolve(msg);
            });
          }, 100);
        });
      },

      scheduleAction(action) {
        googletag.cmd.push(action);
      },

      scheduleSetPageTargetingValues(keyValuePairs) {
        return new Promise((resolve, reject) => {
          this.scheduleAction(() => {
            try {
              const pubads = googletag.pubads();
              Object.keys(keyValuePairs).forEach(key => {
                pubads.setTargeting(key, keyValuePairs[key]);
              });
              eventCallback("warn", "[Google] INFO: set page target");
              eventCallback("log", keyValuePairs);
              resolve(keyValuePairs);
            } catch (err) {
              eventCallback("error", err.stack);
              reject(err);
            }
          });
        });
      },

      setSlotTargeting(slot, slotName, mappings, slotTargeting) {
        slot.addService(googletag.pubads());
        const gptMapping = googletag.sizeMapping();
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
      },

      setupAsync() {
        return new Promise((resolve, reject) => {
          this.scheduleAction(() => {
            try {
              const pubads = googletag.pubads();
              pubads.disableInitialLoad();
              pubads.enableSingleRequest();
              pubads.collapseEmptyDivs(true, true);
              googletag.enableServices();
              const msg = "[Google] INFO: setupAsync";
              eventCallback("warn", msg);
              resolve(msg);
            } catch (err) {
              eventCallback("error", err.stack);
              reject(err);
            }
          });
        });
      }
    },

    grapeshot: {
      setupAsync(gpt, utils) {
        const grapeshotUrl = `https://newscorp.grapeshot.co.uk/thetimes/channels.cgi?url=${encodeURIComponent(
          data.contextUrl
        )}`;
        return utils
          .loadScript(grapeshotUrl)
          .then(() => {
            gpt.scheduleSetPageTargetingValues({
              gs_cat: window.gs_channels
            });
          })
          .catch(err => {
            eventCallback("error", err.stack);
            return Promise.resolve(err);
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

    handleError(err) {
      eventCallback("error", err.stack);
      eventCallback("error", "renderFailed");
      eventCallback("renderFailed");
      return Promise.reject(err);
    },

    init() {
      if (initCalled) {
        eventCallback("warn", "init() has already been called");
        return Promise.reject(new Error("init() has already been called"));
      }
      initCalled = true;

      const { disableAds } = data;
      if (disableAds) {
        eventCallback("warn", "ads disabled");
        return this.handleError(new Error("ads disabled"));
      }

      this.initElement();

      return this.initSetup()
        .then(() => {
          eventCallback("warn", "renderComplete");
          eventCallback("renderComplete");
        })
        .catch(err => this.handleError(err));
    },

    initElement() {
      const { config: slotConfig } = data;
      const { slotName } = slotConfig;
      if (el) {
        /* eslint-disable no-param-reassign */
        el.id = `${slotName}`;
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.margin = "0 auto";
        el.style.height = "100%";
        /* eslint-enable no-param-reassign */
      }
    },

    initPageAsync() {
      if (isWeb && window.matchMedia) {
        Object.keys(this.utils.breakpoints).forEach(b => {
          window
            .matchMedia(this.utils.breakpoints[b])
            .addListener(this.handleBreakpointChange.bind(this, b));
        });
      }

      const parallelActions = [this.gpt.setupAsync(), this.gpt.doSlotAdSetup()];
      if (bidInitialiser) {
        parallelActions.push(bidInitialiser);
        return Promise.all(parallelActions);
      }

      this.grapeshot.setupAsync(this.gpt, this.utils);
      parallelActions.push(
        this.utils.loadScript("https://www.googletagservices.com/tag/js/gpt.js")
      );
      if (withoutHeaderBidding) {
        const { prebidConfig } = data;
        parallelActions.push(this.prebid.setupAsync(prebidConfig, this.utils));
      }

      return Promise.all(parallelActions);
    },

    initSetup() {
      if (window.initCalled) {
        eventCallback("warn", "initSetup() has already been called");
        return Promise.resolve("initSetup() has already been called");
      }
      window.initCalled = true;

      return this.initPageAsync()
        .then(() => {
          const { networkId, adUnit, prebidConfig, section, slots } = data;
          return this.prebid.requestBidsAsync(
            prebidConfig,
            slots,
            networkId,
            adUnit,
            section
          );
        })
        .then(() => this.gpt.gptInitialised());
    },

    prebid: {
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

      requestBidsAsync(prebidConfig, slots, networkId, adUnit, section) {
        if (!isWeb) {
          eventCallback("warn", "no prebid on native platform");
          return Promise.resolve("no prebid on native platform");
        }

        pbjs.bidderTimeout = prebidConfig.timeout;
        pbjs.bidderSettings = prebidConfig.bidderSettings(prebidConfig);
        const initPrebid = new Promise(resolve => {
          this.schedulePrebidAction(() => {
            try {
              const { debug } = data;
              const { init } = prebidConfig;
              init.debug = debug;
              pbjs.setConfig(init);
              eventCallback("warn", "[Prebid] INFO: initialised");
              eventCallback("log", init);
              resolve(init);
            } catch (err) {
              eventCallback("error", err.stack);
              resolve(err);
            }
          });
        });
        const biddingActions = [initPrebid, this.requestPrebidBids(slots)];

        const amazonAccountID =
          prebidConfig.bidders.amazon && prebidConfig.bidders.amazon.accountId;
        if (amazonAccountID) {
          if (withoutHeaderBidding) {
            biddingActions.push(
              this.setupApstag(amazonAccountID, prebidConfig.timeout)
            );
          }
          this.scheduleRequestAmazonBids(slots, networkId, adUnit, section);
        }

        return Promise.all(biddingActions);
      },

      requestPrebidBids(slots) {
        return new Promise(resolve => {
          this.schedulePrebidAction(() => {
            try {
              if (slots.length < 1) {
                throw new Error("no ad slots are defined");
              }
              eventCallback("warn", "[Prebid] INFO: requesting bids");
              eventCallback("log", slots);
              this.setAdUnits(slots);
              pbjs.requestBids({
                bidsBackHandler(bids) {
                  eventCallback("warn", "[Prebid] INFO: bid response");
                  eventCallback("log", bids);
                  resolve(bids);
                }
              });
            } catch (err) {
              eventCallback("error", err.stack);
              resolve(err);
            }
          });
        });
      },

      schedulePrebidAction(action) {
        pbjs.que.push(action);
      },

      scheduleRequestAmazonBids(adsSlots, networkId, adUnit, section) {
        return new Promise(resolve => {
          try {
            const amazonSlots = this.getAmazonConfig(
              adsSlots,
              networkId,
              adUnit,
              section
            );
            if (amazonSlots.length < 1) {
              throw new Error("no amazon ad slots are defined");
            }
            eventCallback("warn", "[Amazon] INFO: fetching bids");
            eventCallback("log", amazonSlots);
            apstag.fetchBids(
              {
                slots: amazonSlots
              },
              aBids => {
                eventCallback("warn", "[Amazon] INFO: bids response");
                eventCallback("log", aBids);
                resolve(aBids);
              }
            );
          } catch (err) {
            eventCallback("error", err.stack);
            resolve(err);
          }
        });
      },

      setAdUnits(adsSlots) {
        adsSlots.forEach(slot => pbjs.removeAdUnit(slot.code));
        pbjs.addAdUnits(adsSlots);
      },

      setupApstag(amazonAccountID, timeout) {
        return new Promise(resolve => {
          try {
            const apstagConfig = {
              adServer: "googletag",
              bidTimeout: timeout,
              gdpr: {
                cmpTimeout: timeout
              },
              pubID: amazonAccountID
            };
            apstag.init(apstagConfig);
            eventCallback("warn", "[Amazon] INFO: initialised");
            eventCallback("log", apstagConfig);
            resolve(apstagConfig);
          } catch (err) {
            eventCallback("error", err.stack);
            resolve(err);
          }
        });
      },

      setupAsync(prebidConfig, utils) {
        const scriptPromises = [
          utils.loadScript(
            "https://www.thetimes.co.uk/d/js/vendor/newPrebid.min-7526ce2390.js"
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
          eventCallback("error", e.stack);
        }
      },

      loadScript(scriptUri) {
        if (scriptsInserted[scriptUri]) {
          return Promise.resolve(`Inserting "${scriptUri}" twice.`);
        }

        scriptsInserted[scriptUri] = true;
        return new Promise((resolve, reject) => {
          this.createScriptElement(
            scriptUri,
            () => {
              resolve(`loaded ${scriptUri}`);
            },
            () => {
              reject(new Error(`load error for ${scriptUri}`));
            }
          );
        });
      }
    }
  };
};

export default adInit;
