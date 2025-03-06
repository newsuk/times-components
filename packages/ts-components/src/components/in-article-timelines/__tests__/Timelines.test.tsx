import React from 'react';
import mockDate from 'mockdate';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Timelines } from '../Timelines';
import { useFetch } from '../../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import '@testing-library/jest-dom';
import 'regenerator-runtime';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

const deckApiPayloadWrapper = () => ({
  data: testDataBullet
});

const deckApiPayloadWrapperCircle = () => ({
  data: testDataCircle
});

const testDataBullet = {
  deck_id: 45060,
  deck_name: '[TEST] Timeline with Bullet Points - 25/08/2021 11:04:10',
  deck_type: 'Timeline with Bullet Points',
  version: 2,
  updated_at: {
    date: '2021-08-16 12:48:43.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'Venezuelan Politics',
    headline: 'A history of injury troubles'
  },
  body: {
    data: [
      {
        type: 'event',
        data: {
          date: '9 June 2018',
          eventHeading: 'Event Heading 1',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '10 June 2018',
          eventHeading: 'Event Heading 2',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '11 June 2018',
          eventHeading: 'Event Heading 3',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '12 June 2018',
          eventHeading: 'Event Heading 4',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '13 June 2018',
          eventHeading: 'Event Heading 5',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '14 June 2018',
          eventHeading: 'Event Heading 6',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '15 June 2018',
          eventHeading: 'Event Heading 7',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html><html><head><title>The Times - In Article Timeline with Bullet Points</title></head><body></body></html>'
};

const testDataCircle = {
  deck_id: 45061,
  deck_name: '[TEST] Timeline with Images - 25/08/2021 11:11:38',
  deck_type: 'Timeline with Circle Images',
  version: 2,
  updated_at: {
    date: '2021-08-16 12:48:43.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'Venezuelan Politics',
    headline: 'A history of injury troubles'
  },
  body: {
    data: [
      {
        type: 'event',
        data: {
          date: '9 June 2018',
          eventHeading: 'Event Heading 1',
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '10 June 2018',
          eventHeading: 'Event Heading 2',
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '11 June 2018',
          eventHeading: 'Event Heading 3',
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '12 June 2018',
          eventHeading: 'Event Heading 4',
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '13 June 2018',
          eventHeading: 'Event Heading 5',
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '14 June 2018',
          eventHeading: 'Event Heading 6',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      },
      {
        type: 'event',
        data: {
          date: '15 June 2018',
          eventHeading: 'Event Heading 7',
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200',
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a. Scelerisque a ullamcorper id maecenas tempor convallis ac cras. 1'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html><html><head><title>The Times - In Article Timeline with Circle Images</title></head><body></body></html>'
};

const renderTimelines = () => render(<Timelines sectionColour="#636C17" />);

describe('Timelines', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the initial loading state correctly', async () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment, findByText } = render(
      <Timelines sectionColour="#636C17" />
    );
    await findByText('Placeholder');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the bullet points component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    const { asFragment } = renderTimelines();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the circle images component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapperCircle());
    const { asFragment, getAllByRole } = renderTimelines();
    expect(getAllByRole('img')[0]).toHaveAttribute(
      'src',
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffee23bf0-04d7-11ec-89b3-29a9a04e8645.jpg?crop=1500%2C844%2C0%2C78&resize=1200'
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('click show all', async () => {
    const { asFragment, getByText, findByText } = render(
      <Timelines sectionColour="#636C17" />
    );
    fireEvent.click(getByText('Show all'));
    await findByText('Collapse');
    expect(asFragment()).toMatchSnapshot();
  });
  describe('tracking', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    let oldIntersectionObserver: typeof IntersectionObserver;
    const analyticsStream = jest.fn();

    beforeEach(() => {
      oldIntersectionObserver = window.IntersectionObserver;
      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      window.IntersectionObserver = oldIntersectionObserver;
      jest.resetAllMocks();
    });

    it('fires scroll event when viewed', () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());

      render(
        <TrackingContextProvider
          context={{
            component: 'ArticleSkeleton',
            attrs: {
              articleHeadline: 'articleHeadline',
              section: 'section'
            }
          }}
          analyticsStream={analyticsStream}
        >
          <Timelines sectionColour="#636C17" />
        </TrackingContextProvider>
      );

      FakeIntersectionObserver.intersect();

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Scrolled',
        component: 'ArticleSkeleton',
        object: 'InArticleTimelines',
        attrs: {
          articleHeadline: 'articleHeadline',
          component_name: 'A history of injury troubles',
          component_type: 'in-article component : timelines: static',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'scroll',
          event_navigation_name: 'in-article component displayed : timelines',
          section: 'section'
        }
      });
    });
  });
});
