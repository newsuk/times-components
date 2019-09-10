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

  const {
    apstag,
    document,
    encodeURIComponent,
    googletag,
    location,
    pbjs,
    Promise,
    Set,
    XMLHttpRequest
  } = window;
  let localInitCalled = false;
  const isWeb = platform === "web";
  const { timeout, bidders } = data.prebidConfig;
  const amazonAccountID = bidders && bidders.amazon && bidders.amazon.accountId;

  return {
    init() {
      if (data.disableAds) {
        return Promise.resolve("ads disabled");
      }

      const gptReady = [Promise.resolve()];
      if (!window.initCalled) {
        if ((!data.bidInitialiser && isWeb) || !isWeb) {
          this.loadScripts();
        }
        gptReady.push(
          this.apstag.process(),
          this.prebid.process(),
          this.gpt.process()
        );
      }
      window.initCalled = true;

      if (!localInitCalled) {
        gptReady.push(this.gpt.bid());
      }
      localInitCalled = true;

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
      this.admantx.init();
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

    admantx: {
      extractNames(values) {
        const cleansedValues = new Set(
          values.map(value =>
            value.name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "_")
              .replace(/["'=!+#*~;^()<>[\],&]/g, "")
          )
        );

        return [...cleansedValues].join(",");
      },

      getUrl() {
        const baseUrl = "https://euasync01.admantx.com/admantx/service";
        const queryParams = encodeURIComponent(
          JSON.stringify({
            key:
              "f1694ae18c17dc1475ee187e4996ad2b484217b1a436cb04b7ac3dd4902180b6",
            method: "descriptor",
            mode: "async",
            decorator: "json",
            filter: "default",
            type: "URL",
            body: location.href
          })
        );

        return `${baseUrl}?request=${queryParams}`;
      },

      init() {
        // We can't use fetch as not supported by IE11
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.getUrl());
        xhr.send();

        xhr.onload = () => {
          if (xhr.status !== 200) {
            eventCallback(`Error: ${xhr.status}: ${xhr.statusText}`);
          } else {
            const { response } = xhr;

            const hasUseableData =
              response.admants ||
              response.categories ||
              response.entities ||
              response.feelings;

            if (hasUseableData) {
              const option = {
                admantx_bs: this.extractNames(response.admants),
                admantx_cat: this.extractNames(response.categories),
                admantx_emotion: this.extractNames(response.feelings),
                admantx_ents: this.extractNames(response.entities)
              };
              googletag.cmd.push(() => this.gpt.setPageTargeting(option));
            }
          }
        };

        xhr.onerror = () => {
          eventCallback("Error in ADmantx request");
        };
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
              return;
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
        return this.waitUntilReady();
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

      bid({ config } = data) {
        this.setSlotTargeting(config);
        return this.waitUntilReady();
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

      process({ pageTargeting } = data) {
        this.init();
        this.setPageTargeting(pageTargeting);
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
