declare global {
  interface Window {
    utag?: {
      link: (params: Record<string, any>) => void;
    };
  }
}

type TrackingParams = Record<string, any>;

export const tealiumTrackingHandler = (
  eventName: string,
  action: string,
  browsingMethod: string,
  additionalParams: TrackingParams = {}
): void => {
  if (window.utag && window.utag.link) {
    window.utag.link({
      event_navigation_name: eventName,
      event_navigation_action: action,
      event_navigation_browsing_method: browsingMethod,
      ...additionalParams
    });
  } else {
    // tslint:disable-next-line:no-console
    console.error('Tealium tracking is not available.');
  }
};
