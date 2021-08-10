import React from 'react';
import mockDate from 'mockdate';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { InfoCardBulletPoints } from '../InfoCardBulletPoints';
import { useFetch } from '../../../helpers/fetch/FetchProvider';
import '@testing-library/jest-dom';
import 'regenerator-runtime';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

const deckApiPayloadWrapper = () => ({
  data: testData
});

const testData = {
  deck_id: 43978,
  deck_name: 'TEST -\u00a0 Bullet Point Card - 03/08/2021 15:18:26',
  deck_type: 'Bullet Point Card',
  version: 1,
  updated_at: {
    date: '2021-08-03 15:19:34.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'Venezuelan Politics',
    headline: 'With a new president officially in place, what will happen?'
  },
  body: {
    data: [
      {
        type: 'bulletpoints',
        data: {
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum'
        }
      },
      {
        type: 'bulletpoints',
        data: {
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient al'
        }
      },
      {
        type: 'bulletpoints',
        data: {
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient alParturient mi dictumst suspendisse torquent primis potenti donec in parturient altorquent primis potenti donec in parturient al'
        }
      },
      {
        type: 'bulletpoints',
        data: {
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.'
        }
      },
      {
        type: 'bulletpoints',
        data: {
          copy:
            'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper idParturient mi dictumst suspendisse torquent priParturient mi dictumst suspendisse torquent primi'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html><html><head><title>The Times - Info Card Bullet Points</title></head><body></body></html>'
};

const renderInfoCardBullet = () =>
  render(<InfoCardBulletPoints sectionColour="#636C17" />);

describe('InfoCardBulletPoints', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the initial loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment } = render(
      <InfoCardBulletPoints sectionColour="#636C17" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the initial read more state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ readMore: true });
    const { asFragment } = render(
      <InfoCardBulletPoints sectionColour="#636C17" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    const { asFragment } = renderInfoCardBullet();
    expect(asFragment()).toMatchSnapshot();
  });

  it('click read more', async () => {
    const { asFragment, getByText, findByText } = render(
      <InfoCardBulletPoints sectionColour="#636C17" />
    );
    fireEvent.click(getByText('Read more'));
    await findByText('Collapse');
    expect(asFragment()).toMatchSnapshot();
  });
});
