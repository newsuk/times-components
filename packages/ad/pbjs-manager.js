/* eslint-env browser */

import { pbjs as config } from "./config";

const PbjsManager = class PbjsManager {
  constructor(options) {
    this.options = options;
    this.scriptSet = false;
    this.initialised = false;
    this.pbjs = null;
    this.registeredAdUnits = {};
  }

  get isReady() {
    return this.initialised && this.scriptSet;
  }

  loadScript() {
    // Check if script tag is already set
    if (this.scriptSet) return;

    // Set the pbjs var
    window.pbjs = window.pbjs || {};
    window.pbjs.que = window.pbjs.que || [];
    this.pbjs = window.pbjs;

    const d = document;
    const pbs = d.createElement("script");
    pbs.async = true;
    pbs.type = "text/javascript";
    pbs.src = "https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js";
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(pbs);

    this.scriptSet = true;
  }

  setConfig() {
    const pbjs = this.pbjs;
    const options = this.options;

    pbjs.bidderTimeout = options.timeout;

    pbjs.bidderSettings = {
      standard: {
        adserverTargeting: [
          {
            key: "hb_bidder",
            val(bidResponse) {
              return bidResponse.bidder;
            }
          },
          {
            key: "hb_adid",
            val(bidResponse) {
              return bidResponse.adId;
            }
          },
          {
            key: "hb_pb",
            val(bidResponse) {
              if (bidResponse.cpm > options.maxBid) {
                return options.maxBid.toFixed(2);
              }
              if (bidResponse.cpm < options.bucketSize) {
                return options.minPrice.toFixed(2);
              }
              return (bidResponse.cpm -
                bidResponse.cpm % options.bucketSize).toFixed(2);
            }
          },
          {
            key: "hb_size",
            val(bidResponse) {
              return bidResponse.size;
            }
          }
        ]
      }
    };

    return Promise.resolve();
  }

  init(adUnits) {
    return new Promise(resolve => {
      if (this.isReady) resolve();

      this.pbjs.que.push(() => {
        // Keep track of the current registered ad units
        adUnits.forEach(adUnit => {
          this.registeredAdUnits[adUnit.code] = adUnit;
        })
        this.pbjs.addAdUnits(adUnits);

        this.pbjs.requestBids({
          bidsBackHandler: () => {
            this.initialised = true;
            return resolve();
          }
        });
      });
    });
  }

  // Optional codes argument will unregister only the specified ads
  removeAdUnits(codes) {
    return new Promise(resolve => {
      this.pbjs.que.push(() => {
        let adsToRemove = codes;
        if (!codes) {
          adsToRemove = Object.keys(this.registeredAdUnits);
        }
        adsToRemove.forEach(code => {
          this.pbjs.removeAdUnit(code);
          delete this.registeredAdUnits[code];
        })
        resolve();
      });
    });
  }
};

export default new PbjsManager(config);

export { PbjsManager };
