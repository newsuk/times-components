/* eslint-env browser */
/* eslint-disable no-param-reassign */
// NOTE: this function must be self-contained, i.e. contain no references to variables
// defined outside the function, so that it can be passed into a WebView.
export default ({ el, data, platform, eventCallback, window }) => {
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

  const { Promise, document, googletag, pbjs, apstag, initCalled } = window;
  let localInitCalled = false;
  const isWeb = platform === "web";
  const { timeout, bidders } = data.prebidConfig;
  const amazonAccountID = bidders && bidders.amazon && bidders.amazon.accountId;

  return {
    init() {
      if (localInitCalled || initCalled || data.disableAds) {
        return Promise.resolve("skipped");
      }
      localInitCalled = true;
      window.initCalled = true;

      if (!data.bidInitialiser) {
        this.loadScripts();
      }

      const gptReady = [
        this.apstag.process(),
        this.prebid.process(),
        this.gpt.process()
      ];

      return Promise.all(gptReady)
        .then(() => {
          this.gpt.refreshAd();
          eventCallback("renderComplete");
        })
        .catch(err => {
          eventCallback("error", err.stack);
          eventCallback("renderFailed");
        });
    },

    loadScripts() {
      if (isWeb) {
        this.breakpoints();
        this.utils.loadScript(this.prebid.url);
      }
      this.utils.loadScript(this.gpt.url);
      this.utils.loadScript(this.apstag.url);
      this.utils
        .loadScript(this.grapeshot.url)
        .then(() => {
          this.gpt.setPageTargeting({
            gs_cat: window.gs_channels
          });
        })
        .catch(err => {
          eventCallback("error", err.stack);
        });
    },

    breakpoints() {
      const breakpoints = {
        huge: "(min-width: 1320px)",
        medium: "(min-width: 768px) and (max-width: 1023px)",
        small: "(max-width: 767px)",
        wide: "(min-width: 1024px) and (max-width: 1319px)"
      };

      if (window.matchMedia) {
        Object.keys(breakpoints).forEach(size => {
          window
            .matchMedia(breakpoints[size])
            .addListener(this.handleBreakPointChange.bind(this, size));
        });
      }
    },

    handleBreakPointChange(breakpoint, mql) {
      if (mql.matches) {
        this.gpt.setPageTargeting({
          breakpoint,
          refresh: "true"
        });
        googletag.cmd.push(() => googletag.pubads().refresh());
      }
    },

    gpt: {
      url: "https://www.googletagservices.com/tag/js/gpt.js",

      setSlotTargeting(
        slotConfig,
        { networkId, adUnit, section, slotTargeting } = data
      ) {
        googletag.cmd.push(() => {
          try {
            const { slotName, sizes, mappings } = slotConfig;
            const slot = googletag.defineSlot(
              `/${networkId}/${adUnit}/${section}`,
              sizes,
              slotName
            );
            if (!slot) {
              throw new Error(
                `Ad slot ${slotName} could not be defined, probably it was already defined`
              );
            }

            slot.addService(googletag.pubads());

            if (el) {
              el.id = `wrapper-${slotName}`;
              el.innerHTML = `<div id="${slotName}"></div>`;
              el.style.display = "flex";
              el.style.alignItems = "center";
              el.style.justifyContent = "center";
              el.style.margin = "0 auto";
              el.style.height = "100%";
            }

            const gptMapping = googletag.sizeMapping();
            mappings.forEach(size =>
              gptMapping.addSize([size.width, size.height], size.sizes)
            );
            slot.defineSizeMapping(gptMapping.build());
            Object.keys(slotTargeting || []).forEach(key =>
              slot.setTargeting(key, slotTargeting[key])
            );
            const randomTestingGroup = Math.floor(
              Math.random() * 10
            ).toString();
            slot.setTargeting("timestestgroup", randomTestingGroup);
            slot.setTargeting("pos", slotName);
            googletag.display(slotName);
            eventCallback(
              "warn",
              `[Google] INFO: set slot targeting - ${slotName}`
            );
          } catch (err) {
            eventCallback("error", err.stack);
          }
        });
      },

      setPageTargeting(keyValuePairs) {
        googletag.cmd.push(() => {
          try {
            const pubads = googletag.pubads();
            Object.keys(keyValuePairs).forEach(key => {
              pubads.setTargeting(key, keyValuePairs[key]);
            });
            eventCallback("warn", "[Google] INFO: set page target");
            eventCallback("log", keyValuePairs);
          } catch (err) {
            eventCallback("error", err.stack);
          }
        });
      },

      init() {
        googletag.cmd.push(() => {
          const pubads = googletag.pubads();
          pubads.disableInitialLoad();
          pubads.enableSingleRequest();
          pubads.collapseEmptyDivs(true, true);
          googletag.enableServices();
          eventCallback("warn", "[Google] INFO: initialised");
        });
      },

      bid({ pageTargeting, allSlotConfigs, config } = data) {
        this.setPageTargeting(pageTargeting);
        if (isWeb) {
          allSlotConfigs.forEach(slot => this.setSlotTargeting(slot));
        } else {
          this.setSlotTargeting(config);
        }
      },

      refreshAd() {
        googletag.cmd.push(() => {
          if (isWeb) {
            pbjs.setTargetingForGPTAsync();
          }
          apstag.setDisplayBids();
          googletag.pubads().refresh();
          eventCallback("warn", "[Google] INFO: pubads refresh");
        });
      },

      process() {
        this.init();
        this.bid();
        return this.waitUntilReady();
      },

      waitUntilReady() {
        return new Promise(resolve =>
          googletag.cmd.push(() => {
            resolve();
          })
        );
      }
    },

    grapeshot: {
      url: `https://newscorp.grapeshot.co.uk/thetimes/channels.cgi?url=${encodeURIComponent(
        data.contextUrl
      )}`
    },

    prebid: {
      url: "https://www.thetimes.co.uk/d/js/vendor/prebid.min-4c674b73bd.js",

      bid({ slots } = data) {
        return new Promise((resolve, reject) => {
          pbjs.que.push(() => {
            try {
              if (slots.length > 0) {
                eventCallback("warn", "[Prebid] INFO: requesting bids");
                eventCallback("log", slots);
                slots.forEach(slot => pbjs.removeAdUnit(slot.code));
                pbjs.addAdUnits(slots);
                pbjs.requestBids({
                  bidsBackHandler(bids) {
                    eventCallback("warn", "[Prebid] INFO: bid response");
                    eventCallback("log", bids);
                    resolve(bids);
                  }
                });
              } else {
                const msg = "[Prebid] INFO: no slots are defined";
                eventCallback("warn", msg);
                resolve(msg);
              }
            } catch (err) {
              reject(err);
            }
          });
        });
      },

      process() {
        if (isWeb) {
          this.init();
          return this.bid();
        }

        const msg = "[Prebid] INFO: no prebid on native";
        eventCallback("warn", msg);
        return Promise.resolve(msg);
      },

      init({ prebidConfig, debug = false } = data) {
        const { init, bidderSettings } = prebidConfig;
        window.pbjs.bidderTimeout = timeout;
        window.pbjs.bidderSettings =
          bidderSettings && bidderSettings(prebidConfig);

        pbjs.que.push(() => {
          init.debug = debug;
          pbjs.setConfig(init);
          eventCallback("warn", "[Prebid] INFO: initialised");
          eventCallback("log", init);
        });
      }
    },

    apstag: {
      url: "https://c.amazon-adsystem.com/aax2/apstag.js",

      getConfig({ slots, networkId, adUnit, section } = data) {
        const adUnitPathParts = [networkId, adUnit];
        if (section) {
          adUnitPathParts.push(section);
        }

        const adUnitPath = adUnitPathParts.reduce(
          (acc, cur, index) =>
            index === 1 ? `/${acc}/${cur}` : `${acc}/${cur}`
        );
        return slots.map(slot => ({
          sizes: slot.sizes,
          slotID: slot.code,
          slotName: adUnitPath
        }));
      },

      bid() {
        return new Promise(resolve => {
          try {
            const amazonSlots = this.getConfig();
            if (amazonSlots.length > 0) {
              eventCallback("warn", "[Amazon] INFO: requesting bids");
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
            } else {
              const msg = "[Amazon] INFO: no slots are defined";
              eventCallback("warn", msg);
              resolve(msg);
            }
          } catch (err) {
            eventCallback("error", err.stack);
            resolve(err);
          }
        });
      },

      process() {
        if (amazonAccountID) {
          this.init();
          return this.bid();
        }

        const msg = "[Amazon] INFO: amazonAccountID undefined";
        eventCallback("warn", msg);
        return Promise.resolve(msg);
      },

      init() {
        const apstagConfig = {
          adServer: "googletag",
          bidTimeout: timeout,
          gdpr: {
            cmpTimeout: timeout
          },
          pubID: amazonAccountID
        };
        eventCallback("warn", "[Amazon] INFO: initialised");
        eventCallback("log", apstagConfig);
        apstag.init(apstagConfig);
      }
    },

    utils: {
      scriptsInserted: {},

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
        if (this.scriptsInserted[scriptUri]) {
          return Promise.resolve(`Inserting "${scriptUri}" twice.`);
        }

        this.scriptsInserted[scriptUri] = true;
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
