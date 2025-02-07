import { tealiumTrackingHandler } from '../TrackingHandler';

declare global {
  interface Window {
    utag?: {
      link: (params: Record<string, any>) => void;
    };
  }
}

describe('tealiumTrackingHandler', () => {
  beforeEach(() => {
    window.utag = {
      link: jest.fn()
    };
  });

  afterEach(() => {
    delete window.utag;
  });

  it('should call utag.link with the correct parameters', () => {
    const eventName = 'test_event';
    const action = 'click';
    const browsingMethod = 'navigation';
    const additionalParams = { customKey: 'customValue' };
    const parentName = 'test';
    const sectionDetails = 'cta button';

    tealiumTrackingHandler(eventName, action, browsingMethod);

    if (window.utag && window.utag.link) {
      window.utag.link({
        event_navigation_name: eventName,
        event_navigation_action: action,
        event_navigation_browsing_method: browsingMethod,
        article_parent_name: parentName,
        section_details: sectionDetails,
        ...additionalParams
      });
    } else {
      // tslint:disable-next-line:no-console
      console.error('Tealium tracking is not available.');
    }
  });

  it('should log an error if utag.link is not available', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    delete window.utag;

    tealiumTrackingHandler('test_event', 'click', 'navigation');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Tealium tracking is not available.'
    );

    consoleErrorSpy.mockRestore();
  });
});
