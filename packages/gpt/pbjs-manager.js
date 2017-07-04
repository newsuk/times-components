const PbjsManager = class PbjsManager {
  constructor(options) {
    if (!new.target) {
      return new PbjsManager(options);
    }

    this._options = options;
    this.scriptSet = false;
    this.initialised = false;
    this.pbjs = null;
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

  setConfig(callback) {
    if (this.isReady) {
      if (callback) return callback();
      return;
    }

    // Script and related vars must be set first
    if (!this.scriptSet) {
      throw new Error("Prebid JS manager needs the script to be set first");
    }

    const pbjs = this.pbjs;
    const options = this._options;

    pbjs.bidderTimeout = options.timeout;

    pbjs.bidderSettings = {
      standard: {
        adserverTargeting: [
          {
            key: "hb_bidder",
            val: function(bidResponse) {
              return bidResponse.bidder;
            }
          },
          {
            key: "hb_adid",
            val: function(bidResponse) {
              return bidResponse.adId;
            }
          },
          {
            key: "hb_pb",
            val: function(bidResponse) {
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
            val: function(bidResponse) {
              return bidResponse.size;
            }
          }
        ]
      }
    };

    if (callback) return callback();
  }

  init(adUnits, callback) {
    if (this.isReady) {
      if (callback) return callback();
      return;
    }

    // Script and related vars must be set first
    if (!this.scriptSet) {
      throw new Error("Prebid JS manager needs the script to be set first");
    }

    this.pbjs.que.push(() => {
      this.pbjs.addAdUnits(adUnits);

      this.pbjs.requestBids({
        bidsBackHandler: () => {
          this.initialised = true;
          if (callback) return callback();
        }
      });
    });
  }
};

export default config => new PbjsManager(config);
