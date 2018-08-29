/* global context */
import { delayAndAdvance } from "@times-components/test-utils";
import { TealiumSendScheduler } from "../../src";

export default () => {
  describe("TealiumSendScheduler", () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

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

    context("inject utag", () => {
      it("should throw if not given an env", () => {
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

      it("should throw if not given a profile", () => {
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

      it("should throw if not given an account", () => {
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

      it("should inject a utag script", () => {
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

      it("should not inject utag multiple times", () => {
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

      it("should not inject utag when tracking is not enabled", () => {
        // eslint-disable-next-line no-new
        new TealiumSendScheduler({ ...trackingOptions, enabled: false });
        expect(
          global.window.document.querySelector('script[src*="utag.js"]')
        ).toBeNull();
      });

      it("should disable tealium automatic page view tracking", () => {
        // eslint-disable-next-line no-new
        new TealiumSendScheduler(
          trackingOptions,
          global.window,
          global.window.document
        );
        expect(global.window.utag_cfg_ovrd.noview).toBe(true);
      });
    });

    context("utag loaded", () => {
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

      it("should schedule sending events during idle time", () => {
        global.window.requestIdleCallback = jest.fn();

        setup();

        expect(global.window.requestIdleCallback).toHaveBeenCalledWith(
          sendScheduler.sendEvents,
          { timeout: 2000 }
        );
      });

      it("should not schedule multiple sends", async () => {
        global.window.requestIdleCallback = jest.fn();

        setup();

        sendScheduler.enqueue();

        await delayAndAdvance(1000);
        expect(global.window.requestIdleCallback).toHaveBeenCalledTimes(1);
      });

      it("should send events", async () => {
        setup();

        const e = { component: "Page" };

        sendScheduler.enqueue(e);

        await delayAndAdvance(1000);
        expect(global.window.tealiumTrack).toHaveBeenCalledWith(e);
      });

      it("should schedule sending events using timeout when idle callback is not available", async () => {
        if (global.window.requestIdleCallback) {
          delete global.window.requestIdleCallback;
        }
        const spy = jest.spyOn(global.window, "setTimeout");

        setup();

        expect(spy).toHaveBeenCalled();

        await delayAndAdvance(1000);
        expect(global.window.tealiumTrack).not.toHaveBeenCalled();
      });

      it("should send multiple events", async () => {
        setup();

        const e1 = { component: "Page1" };
        const e2 = { component: "Page2" };

        sendScheduler.enqueue(e1);
        sendScheduler.enqueue(e2);

        await delayAndAdvance(1000);
        expect(global.window.tealiumTrack).toHaveBeenCalledTimes(2);
      });

      it("should not throw if tealium track is not a function", async () => {
        setup();

        global.window.tealiumTrack = null;

        sendScheduler.enqueue();

        await delayAndAdvance(1000);
      });

      it("should send more events if they cannot be sent in time", async () => {
        global.window.requestIdleCallback = fn => {
          setTimeout(() => {
            fn({
              timeRemaining() {
                return 0;
              }
            });
          }, 0);
        };
        setup();

        const spy = jest.spyOn(sendScheduler, "scheduleSendEvents");

        const e1 = { component: "Page1" };
        const e2 = { component: "Page2" };

        sendScheduler.enqueue(e1);
        sendScheduler.enqueue(e2);

        await delayAndAdvance(1000);
        expect(global.window.tealiumTrack).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledTimes(3);
      });
    });
  });
};
