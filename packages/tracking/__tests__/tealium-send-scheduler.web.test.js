import TealiumSendScheduler from "../tealium/tealium-send-scheduler";

describe("TealiumSendScheduler", () => {
  const trackingOptions = {
    enabled: true,
    profile: "times.2017",
    env: "dev",
    account: "newsuk"
  };

  const realUtag = global.window.utag;
  let sendScheduler;

  afterEach(() => {
    global.window.utag = realUtag;
  });

  describe("inject utag", () => {
    beforeEach(() => {
      TealiumSendScheduler.scriptInjected = false;
      TealiumSendScheduler.scriptLoaded = false;
    });

    afterEach(() => {
      const utags = global.window.document.querySelectorAll(
        'script[src*="utag.js"]'
      );
      utags.forEach(utag => utag.remove());
    });

    it("injects utag script", () => {
      // eslint-disable-next-line no-new
      new TealiumSendScheduler(
        trackingOptions,
        global.window,
        global.window.document
      );
      expect(
        global.window.document.querySelector('script[src*="utag.js"]')
      ).not.toBeNull();
    });

    it("does not inject utag multiple times", () => {
      // eslint-disable-next-line no-new
      new TealiumSendScheduler(
        trackingOptions,
        global.window,
        global.window.document
      );
      // eslint-disable-next-line no-new
      new TealiumSendScheduler(
        trackingOptions,
        global.window,
        global.window.document
      );
      expect(
        global.window.document.querySelectorAll('script[src*="utag.js"]').length
      ).toBe(1);
    });

    it("does not inject utag when tracking is not enabled", () => {
      // eslint-disable-next-line no-new
      new TealiumSendScheduler(
        Object.assign(trackingOptions, { enabled: false })
      );
      expect(
        global.window.document.querySelector('script[src*="utag.js"]')
      ).toBeNull();
    });

    it("disables tealium automatic page view tracking", () => {
      // eslint-disable-next-line no-new
      new TealiumSendScheduler(
        trackingOptions,
        global.window,
        global.window.document
      );
      expect(global.window.utag_cfg_ovrd.noview).toBe(true);
    });
  });

  describe("utag loaded", () => {
    const realRequestIdleCallback = global.window.requestIdleCallback;

    beforeEach(() => {
      global.window.utag = { view: () => {}, link: () => {} };
      TealiumSendScheduler.scriptLoaded = true;
      sendScheduler = new TealiumSendScheduler(
        trackingOptions,
        global.window,
        global.window.document
      );
    });

    afterEach(() => {
      global.window.requestIdleCallback = realRequestIdleCallback;
      TealiumSendScheduler.scriptLoaded = false;
    });

    it("schedules sending events during idle time", () => {
      global.window.requestIdleCallback = jest.fn();
      sendScheduler.scheduleSendEvents();
      expect(global.window.requestIdleCallback).toHaveBeenCalledWith(
        sendScheduler.sendEvents,
        { timeout: 2000 }
      );
    });

    it("does not schedule multiple sends", () => {
      global.window.requestIdleCallback = jest.fn();
      sendScheduler.scheduleSendEvents();
      sendScheduler.scheduleSendEvents();
      expect(global.window.requestIdleCallback).toHaveBeenCalledTimes(1);
    });

    it("schedules sending events using timeout when idle callback is not available", () => {
      if (global.window.requestIdleCallback) {
        delete global.window.requestIdleCallback;
      }
      const spy = jest.spyOn(global.window, "setTimeout");
      sendScheduler.scheduleSendEvents();
      expect(spy).toHaveBeenCalled();
    });

    it("sends page view events", () => {
      const spy = jest.spyOn(global.window.utag, "view");
      const e = { component: "Page" };
      sendScheduler.queue.push(e);
      sendScheduler.sendEvents({ timeRemaining: () => 50 });
      expect(spy).toHaveBeenCalledWith(e);
    });

    it("sends link events", () => {
      const spy = jest.spyOn(global.window.utag, "link");
      const e = { component: "Pagination" };
      sendScheduler.queue.push(e);
      sendScheduler.sendEvents({ timeRemaining: () => 50 });
      expect(spy).toHaveBeenCalledWith(e);
    });

    it("sends multiple events", () => {
      const spy = jest.spyOn(global.window.utag, "link");
      sendScheduler.queue.push(
        { component: "Pagination" },
        { component: "Pagination" }
      );
      sendScheduler.sendEvents({ timeRemaining: () => 50 });
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("sends at least 1 event", () => {
      const spy = jest.spyOn(global.window.utag, "link");
      sendScheduler.queue.push({ component: "Pagination" });
      sendScheduler.sendEvents({ timeRemaining: () => 0 });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("does not attempt to send event when nothing is in queue", () => {
      const spy = jest.spyOn(global.window.utag, "link");
      sendScheduler.sendEvents({ timeRemaining: () => 0 });
      expect(spy).not.toHaveBeenCalled();
    });

    it("schedules sending events when not all events sent in timeslot", () => {
      const linkSpy = jest.spyOn(global.window.utag, "link");
      const schedulerSpy = jest.spyOn(sendScheduler, "scheduleSendEvents");
      sendScheduler.queue.push(
        { component: "Pagination" },
        { component: "Pagination" }
      );
      sendScheduler.sendEvents({ timeRemaining: () => 0 });
      expect(linkSpy).toHaveBeenCalledTimes(1);
      expect(schedulerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
