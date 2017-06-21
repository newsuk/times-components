
function GptManager () {
  if (!(this instanceof GptManager)) {
    return new GptManager();
  }

  this.scriptSet = false;
  this.initialised = false;
  this.googletag = null;
}

GptManager.prototype.isReady = function isReady () {
  return this.scriptSet && this.initialised;
};

GptManager.prototype.loadScript = function loadScript () {
  // Check if script tag is already set
  if (this.scriptSet) return;

  // Set the googletag var
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  this.googletag = window.googletag;

  const gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  gads.src = '//www.googletagservices.com/tag/js/gpt.js';

  const head = document.getElementsByTagName('head')[0];
  head.appendChild(gads);

  this.scriptSet = true;
};

GptManager.prototype.setConfig = function setConfig (callback) {
  if (this.isReady()) return callback();

  const googletag = this.googletag;

  googletag.cmd.push(() => {
    // googletag.openConsole()
    // Infinite scroll requires SRA
    googletag.pubads().enableSingleRequest();

    // add support for async loading
    googletag.pubads().enableAsyncRendering();

    // collapse div without ad
    googletag.pubads().collapseEmptyDivs();

    // load ad with slot refresh
    googletag.pubads().disableInitialLoad();

    callback();
  });
};

GptManager.prototype.init = function init (callback) {
  if (this.isReady()) return callback();

  this.googletag.cmd.push(() => {
    // enable google publisher tag
    this.googletag.enableServices();
    this.initialised = true;
    callback();
  });
};

export default new GptManager();
