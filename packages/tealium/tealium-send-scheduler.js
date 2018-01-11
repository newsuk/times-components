export default class TealiumSendScheduler {
  constructor(options, w, d) {
    this.queue = [];
    this.sendEventScheduled = false;
    this.w = w;
    this.d = d;
    this.scheduleSendEvents = this.scheduleSendEvents.bind(this);
    this.sendEvents = this.sendEvents.bind(this);

    if (!TealiumSendScheduler.scriptInjected) {
      this.injectTealiumScript(options);
      TealiumSendScheduler.scriptInjected = true;
    }
  }

  disableAutoPageViewTracking() {
    this.w.utag_cfg_ovrd = { noview: true };
  }

  injectTealiumScript(options) {
    const { enabled, env, profile, account } = options;
    if (!enabled) {
      return;
    }
    ["env", "profile", "account"].forEach(option => {
      if (!options[option])
        throw new Error(`Tealium option not supplied: ${option}`);
    });

    this.disableAutoPageViewTracking();

    const utag = this.d.createElement("script");
    utag.async = true;
    utag.type = "text/javascript";
    utag.onload = () => {
      TealiumSendScheduler.scriptLoaded = true;
      this.scheduleSendEvents();
    };

    this.d.head.appendChild(utag);

    utag.src = `//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js`;
  }

  enqueue(e) {
    this.queue.push(e);
    this.scheduleSendEvents();
  }

  scheduleSendEvents() {
    if (
      this.sendEventScheduled ||
      !TealiumSendScheduler.scriptLoaded ||
      typeof this.w.tealiumTrack !== "function"
    ) {
      return;
    }

    this.sendEventScheduled = true;

    if (typeof this.w.requestIdleCallback !== "undefined") {
      this.w.requestIdleCallback(this.sendEvents, { timeout: 2000 });
    } else {
      this.w.setTimeout(() => {
        const start = Date.now();
        this.sendEvents({
          timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
        });
      }, 0);
    }
  }

  sendEvents(deadline) {
    this.sendEventScheduled = false;
    do {
      if (!this.queue.length) {
        break;
      }

      const e = this.queue.shift();

      this.w.tealiumTrack(e);
    } while (deadline.timeRemaining() > 0);

    if (this.queue.length > 0) {
      this.scheduleSendEvents();
    }
  }
}
