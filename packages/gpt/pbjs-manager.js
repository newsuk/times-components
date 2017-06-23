import { pbjs as config } from "./config";

function PbjsManager(options) {
  this._options = options;
  this.scriptSet = false;
  this.initialised = false;
  this.pbjs = null;
}

PbjsManager.prototype.isReady = function isReady() {
  return this.initialised && this.scriptSet;
};

PbjsManager.prototype.loadScript = function loadScript() {
  // Check if script tag is already set
  if (this.scriptSet) return;

  // Set the pbjs var
  window.pbjs = window.pbjs || {};
  window.pbjs.que = window.pbjs.que || [];
  this.pbjs = window.pbjs;

  const d = document;
  const pbs = d.createElement("script");
  pbs.async = true;
  // const pro = d.location.protocol;
  pbs.type = "text/javascript";
  // pbs.src = ((pro === 'https:') ? 'https' : 'http') + '://acdn.adnxs.com/prebid/not-for-prod/prebid.js';
  pbs.src = "https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js";
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(pbs);

  this.scriptSet = true;
};

PbjsManager.prototype.setConfig = function setConfig(callback) {
  if (this.initialised) return callback();

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

  callback();
};

PbjsManager.prototype.init = function init(adUnits, callback) {
  this.pbjs.que.push(() => {
    console.log(adUnits);
    this.pbjs.addAdUnits(adUnits);

    this.pbjs.requestBids({
      bidsBackHandler: () => {
        this.initialised = true;
        callback();
      }
    });
  });
};

export default new PbjsManager(config);
