import { makeTracking } from "./base-tracking";

export { default as createConsoleReporter } from "./reporters/console-logger";
export { default as tealiumTransformer } from "./transformers/tealium";
export { default as addTrackingContext } from "./tracking-context";

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
    handleChildViewed(data) {
      const id = data[trackChildViews.id];

      if (this.viewed.has(id)) {
        return;
      }

      this.viewed.add(id);

      this.onChildView(id, data, new Date().getTime());
    }

    render() {
      const customProps = trackChildViews.listPath
        ? { onViewed: this.handleChildViewed.bind(this) }
        : {};
      return super.render(customProps);
    }
  };
