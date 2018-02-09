import TealiumSendScheduler from "../tealium-send-scheduler";

module.exports = () => {
  describe("TealiumSendScheduler", () => {
    const trackingOptions = {
      enabled: true,
      profile: "times.2017",
      env: "dev",
      account: "newsuk"
    };

    const realUtag = global.window.utag;
    let sendScheduler;

    beforeEach(() => {
      TealiumSendScheduler.scriptInjected = false;
      TealiumSendScheduler.scriptLoaded = false;
    });

    afterEach(() => {
      const utags = global.window.document.querySelectorAll(
        'script[src*="utag.js"]'
      );
      utags.forEach(utag => utag.remove());

      global.window.utag = realUtag;
    });

    describe("inject utag", () => {
      it("throws if not given an env", () => {
        const makeTealiumScheduler = () =>
          new TealiumSendScheduler(
            {
              ...trackingOptions,
              env: undefined
            },
            global.window,
            global.window.document
          );
        expect(makeTealiumScheduler).toThrowErrorMatchingSnapshot();
      });

      it("throws if not given a profile", () => {
        const makeTealiumScheduler = () =>
          new TealiumSendScheduler(
            {
              ...trackingOptions,
              profile: undefined
            },
            global.window,
            global.window.document
          );
        expect(makeTealiumScheduler).toThrowErrorMatchingSnapshot();
      });

      it("throws if not given an account", () => {
        const makeTealiumScheduler = () =>
          new TealiumSendScheduler(
            {
              ...trackingOptions,
              account: undefined
            },
            global.window,
            global.window.document
          );
        expect(makeTealiumScheduler).toThrowErrorMatchingSnapshot();
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
          global.window.document.querySelectorAll('script[src*="utag.js"]')
            .length
        ).toBe(1);
      });

      it("does not inject utag when tracking is not enabled", () => {
        // eslint-disable-next-line no-new
        new TealiumSendScheduler({ ...trackingOptions, enabled: false });
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

      const setup = () => {
        global.window.tealiumTrack = jest.fn();

        sendScheduler = new TealiumSendScheduler(
          trackingOptions,
          global.window,
          global.window.document
        );

        const utag = global.window.document.querySelector(
          'script[src*="utag.js"]'
        );

        utag.onload();
      };

      afterEach(() => {
        global.window.requestIdleCallback = realRequestIdleCallback;
        TealiumSendScheduler.scriptLoaded = false;
      });

      it("schedules sending events during idle time", () => {
        global.window.requestIdleCallback = jest.fn();

        setup();

        expect(global.window.requestIdleCallback).toHaveBeenCalledWith(
          sendScheduler.sendEvents,
          { timeout: 2000 }
        );
      });

      it("does not schedule multiple sends", () => {
        global.window.requestIdleCallback = jest.fn();

        setup();

        sendScheduler.enqueue();

        expect(global.window.requestIdleCallback).toHaveBeenCalledTimes(1);
      });

      it("sends events", done => {
        setup();

        const e = { component: "Page" };

        sendScheduler.enqueue(e);

        global.window.setTimeout(() => {
          expect(global.window.tealiumTrack).toHaveBeenCalledWith(e);
          done();
        }, 0);
      });

      it("schedules sending events using timeout when idle callback is not available", done => {
        if (global.window.requestIdleCallback) {
          delete global.window.requestIdleCallback;
        }
        const spy = jest.spyOn(global.window, "setTimeout");

        setup();

        expect(spy).toHaveBeenCalled();

        global.window.setTimeout(() => {
          expect(global.window.tealiumTrack).not.toHaveBeenCalled();
          done();
        }, 0);
      });

      it("sends multiple events", done => {
        setup();

        const e1 = { component: "Page1" };
        const e2 = { component: "Page2" };

        sendScheduler.enqueue(e1);
        sendScheduler.enqueue(e2);

        global.window.setTimeout(() => {
          expect(global.window.tealiumTrack).toHaveBeenCalledTimes(2);
          done();
        }, 0);
      });

      it("does not throw if tealium track is not a function", done => {
        setup();

        global.window.tealiumTrack = null;

        sendScheduler.enqueue();

        global.window.setTimeout(done, 0);
      });

      it("sends more events if they cannot be sent in time", done => {
        setup();

        const e1 = { component: "Page1" };
        const e2 = { component: "Page2" };

        global.window.tealiumTrack = () => {
          let count = 100000000;
          while (count) {
            count -= 1;
          }
        };

        jest.spyOn(global.window, "tealiumTrack");

        sendScheduler.enqueue(e1);
        sendScheduler.enqueue(e2);

        global.window.setTimeout(() => {
          expect(global.window.tealiumTrack).toHaveBeenCalledTimes(2);
          done();
        }, 1000);
      });
    });
  });
};
