/* eslint-env browser */
// NOTE: this function must be self-contained, i.e. contain no references to variables
// defined outside the function, so that it can be passed into a WebView.
const adInit = args => {
  const { el, data, platform, eventCallback, window } = args;
  const { document, setTimeout, Promise } = window;
  const enablePrebidding = platform === "web";
  const hasBidInitialiser =
    window.nuk && window.nuk.ads && window.nuk.ads.loaded;
  const withoutHeaderBidding = enablePrebidding && !hasBidInitialiser;
  const scriptsInserted = {};
  let initCalled = false;

  return {
    destroySlots() {
      this.gpt.destroySlots();
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
        return new Promise(resolve => {
          try {
            this.scheduleAction(() => {
              const adUnitPath = `/${networkId}/${adUnit}/${section}`;
              const { slotName, sizes, mappings } = slotConfig;
              const slot = window.googletag.defineSlot(
                adUnitPath,
                sizes,
                slotName
              );

              if (!slot) {
                throw new Error(
                  `Ad slot ${slotName} ${adUnitPath} could not be defined, probably it was already defined`
                );
              }

              this.setElement(slotName);
              this.setSlotTargeting(slot, slotName, mappings, slotTargeting);
              window.googletag.display(slotName);
              window.googletag.pubads().refresh();
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

      enableService() {
        return new Promise(resolve => {
          this.scheduleAction(() => {
            window.googletag.enableServices();
            const msg = "[Google] INFO: enable services";
            eventCallback("warn", msg);
            resolve(msg);
          });
        });
      },

      gptInitialised() {
        return this.enableService().then(
          () =>
            new Promise(resolve => {
              this.scheduleAction(() => {
                if (enablePrebidding) {
                  try {
                    window.pbjs.setTargetingForGPTAsync();
                    const { prebidConfig } = data;
                    const amazonAccountID =
                      prebidConfig.bidders.amazon &&
                      prebidConfig.bidders.amazon.accountId;
                    if (window.apstag && amazonAccountID) {
                      window.apstag.setDisplayBids();
                    }
                  } catch (err) {
                    eventCallback("error", err.stack);
                  }
                }
                setTimeout(() => {
                  this.displayAds();
                  const msg = "[Google] INFO: displayed ads";
                  eventCallback("warn", msg);
                  resolve(msg);
                }, 100);
              });
            })
        );
      },

      scheduleAction(action) {
        window.googletag.cmd.push(action);
      },

      scheduleSetPageTargetingValues(keyValuePairs) {
        return new Promise((resolve, reject) => {
          this.scheduleAction(() => {
            try {
              const pubads = window.googletag.pubads();
              Object.keys(keyValuePairs).forEach(key => {
                pubads.setTargeting(key, keyValuePairs[key]);
              });
              eventCallback("warn", keyValuePairs);
              resolve(keyValuePairs);
            } catch (err) {
              eventCallback("error", err.stack);
              reject(err);
            }
          });
        });
      },

      setElement(slotName) {
        /* eslint-disable no-param-reassign */
        el.id = `wrapper-${slotName}`;
        el.innerHTML = `<div id="${slotName}"></div>`;
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.margin = "0 auto";
        el.style.height = "100%";
        /* eslint-enable no-param-reassign */
      },

      setSlotTargeting(slot, slotName, mappings, slotTargeting) {
        slot.addService(window.googletag.pubads());
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
      },

      setupAsync() {
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
        const setPageTarget = this.scheduleSetPageTargetingValues(
          data.pageTargeting
        );
        const initGPT = new Promise((resolve, reject) => {
          this.scheduleAction(() => {
            try {
              const pubads = window.googletag.pubads();
              pubads.disableInitialLoad();
              pubads.enableSingleRequest();
              const msg = "[Google] INFO: setupAsync";
              eventCallback("warn", msg);
              resolve(msg);
            } catch (err) {
              eventCallback("error", err.stack);
              reject(err);
            }
          });
        });
        return Promise.all([setPageTarget, initGPT]);
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
      this.gpt.destroySlots();
      eventCallback("error", err.stack);
      eventCallback("renderFailed");
      return Promise.reject(err.message);
    },

    init() {
      if (initCalled) {
        return Promise.reject(new Error("init() has already been called"));
      }
      initCalled = true;

      return this.initSetup()
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
        .then(() => this.gpt.gptInitialised())
        .then(() => eventCallback("renderComplete"))
        .catch(err => this.handleError(err));
    },

    initPageAsync() {
      const { prebidConfig } = data;
      const parallelActions = [
        this.gpt.setupAsync(this.utils),
        this.gpt.doSlotAdSetup()
      ];

      if (enablePrebidding && window.matchMedia) {
        Object.keys(this.utils.breakpoints).forEach(b => {
          window
            .matchMedia(this.utils.breakpoints[b])
            .addListener(this.handleBreakpointChange.bind(this, b));
        });
      }
      if (!hasBidInitialiser) {
        this.grapeshot.setupAsync(this.gpt, this.utils);
        parallelActions.push(
          this.utils.loadScript(
            "https://www.googletagservices.com/tag/js/gpt.js"
          )
        );
      }
      if (withoutHeaderBidding) {
        parallelActions.push(this.prebid.setupAsync(prebidConfig, this.utils));
      }

      return Promise.all(parallelActions);
    },

    initSetup() {
      try {
        if (hasBidInitialiser) {
          return Promise.all([window.nuk.ads.loaded, this.gpt.doSlotAdSetup()]);
        }
        if (!window.initCalled) {
          window.initCalled = true;
          return this.initPageAsync();
        }
        return this.gpt.doSlotAdSetup();
      } catch (err) {
        return this.handleError(err);
      }
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
        if (!enablePrebidding) {
          return Promise.resolve("no prebid on native platform");
        }

        window.pbjs.bidderTimeout = prebidConfig.timeout;
        window.pbjs.bidderSettings = prebidConfig.bidderSettings(prebidConfig);
        const initPrebid = new Promise(resolve => {
          this.schedulePrebidAction(() => {
            try {
              const { debug } = data;
              const { init } = prebidConfig;
              init.debug = debug;
              window.pbjs.setConfig(init);
              eventCallback("warn", init);
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
          // TODO: at the moment we configure the amazon bids with just one slot (the first one)
          // because we call init just one time (window.initCalled)
          // to be fixed in REPLAT-1370
          if (withoutHeaderBidding) {
            biddingActions.push(
              this.setupApstag(amazonAccountID, prebidConfig.timeout)
            );
          }
          biddingActions.push(
            this.scheduleRequestAmazonBids(slots, networkId, adUnit, section)
          );
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
              eventCallback("warn", slots);
              this.setAdUnits(slots);
              window.pbjs.requestBids({
                bidsBackHandler(bids) {
                  eventCallback("warn", bids);
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
        window.pbjs.que.push(action);
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
            eventCallback("warn", amazonSlots);
            window.apstag.fetchBids(
              {
                slots: amazonSlots
              },
              aBids => {
                eventCallback("warn", aBids);
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
        adsSlots.forEach(slot => window.pbjs.removeAdUnit(slot.code));
        window.pbjs.addAdUnits(adsSlots);
      },

      setupApstag(amazonAccountID, timeout) {
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
            window.apstag.init(apstagConfig);
            eventCallback("warn", apstagConfig);
            resolve(apstagConfig);
          } catch (err) {
            eventCallback("error", err.stack);
            resolve(err);
          }
        });
      },

      setupAsync(prebidConfig, utils) {
        window.pbjs = window.pbjs || {};
        window.pbjs.que = window.pbjs.que || [];
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
