/* eslint-env browser */

import _get from "lodash.get";
import { makeTracking } from "./base-tracking";

export { default as createConsoleReporter } from "./reporters/console-logger";
export { default as tealiumTransformer } from "./transformers/tealium";
export { default as addTrackingContext } from "./tracking-context";

const makeDateFromElapsedTime = time =>
  new Date(window.performance.timing.navigationStart + time);

export const addTracking = (
  WrappedComponent,
  {
    analyticsEvents = [],
    trackingName,
    attrs = {},
    trackView,
    trackChildViews = {}
  } = {}
) =>
  class WithTracking extends makeTracking(WrappedComponent, {
    analyticsEvents,
    trackingName,
    attrs,
    trackView,
    trackChildViews
  }) {
    constructor(props) {
      super(props);

      if (trackChildViews) {
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        };

        this.observer = new window.IntersectionObserver(
          this.onObserved.bind(this),
          options
        );
      }
    }

    onObserved([{ intersectionRatio, isIntersecting, time, target }]) {
      if (this.context && !this.context.tracking) {
        return;
      }

      if (
        isIntersecting &&
        intersectionRatio === 1 &&
        !this.viewed.has(target.id)
      ) {
        this.viewed.add(target.id);

        this.onChildView(
          target.id,
          this.childData[target.id],
          makeDateFromElapsedTime(time)
        );
      }
    }

    observeChild(props) {
      this.observer.observe(document.getElementById(props[trackChildViews.id]));
      this.childData[props[trackChildViews.id]] = props;
    }

    observeChildren() {
      if (trackChildViews && trackChildViews.listPath) {
        const list = _get(this.props, trackChildViews.listPath, []);
        list.forEach((props, index) => {
          if (!this.childData[props[trackChildViews.id]]) {
            this.observeChild({
              ...props,
              index,
              total: list.length
            });
          }
        });
      }
    }

    componentDidMount() {
      super.componentDidMount();
      this.observeChildren();
    }

    componentDidUpdate() {
      this.observeChildren();
    }

    componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  };
