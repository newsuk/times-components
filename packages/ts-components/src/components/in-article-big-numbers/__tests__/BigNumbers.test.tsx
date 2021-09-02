import React from 'react';
import mockDate from 'mockdate';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BigNumbers } from '../BigNumbers';
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
  data: testDataWide
});

const deckApiPayloadWrapperStandard = () => ({
  data: testDataStandard
});

const testDataStandard = {
  deck_id: 4043,
  deck_name: '[TEST] Big Numbers Card - Standard - 16/08/2021 12:48:51',
  deck_type: 'Big Numbers Card',
  version: 2,
  updated_at: {
    date: '2021-08-16 12:48:43.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'President Race',
    headline: 'The stats behind the two candidates',
    size: '4043'
  },
  body: {
    data: [
      {
        type: 'bignumbers',
        data: {
          number: '$497.8m',
          copy: 'Money raised by Hillary Clinton'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '$247.8m',
          copy: 'Money raised by Donald Trump'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '71.6m',
          copy:
            'The number of people who turned in to the final president debate'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '2-7',
          copy:
            'Clinton\u2019s odds of winning the US election (provided by Paddy Power)'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '3-1',
          copy:
            'Trump\u2019s odds of winning the US election (provided by Paddy Power)'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html><html><head><title>The Times - In Article Big Numbers</title></head><body></body></html>'
};

const testDataWide = {
  deck_id: 44334,
  deck_name: '[TEST] Big Numbers Card - Wide - 16/08/2021 10:48:01',
  deck_type: 'Big Numbers Card',
  version: 2,
  updated_at: {
    date: '2021-08-16 12:48:43.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'President Race',
    headline: 'The stats behind the two candidates',
    size: '4042'
  },
  body: {
    data: [
      {
        type: 'bignumbers',
        data: {
          number: '$497.8m',
          copy: 'Money raised by Hillary Clinton'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '$247.8m',
          copy: 'Money raised by Donald Trump'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '71.6m',
          copy:
            'The number of people who turned in to the final president debate'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '2-7',
          copy:
            'Clinton\u2019s odds of winning the US election (provided by Paddy Power)'
        }
      },
      {
        type: 'bignumbers',
        data: {
          number: '3-1',
          copy:
            'Trump\u2019s odds of winning the US election (provided by Paddy Power)'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html><html><head><title>The Times - In Article Big Numbers</title></head><body></body></html>'
};

const renderBigNumbers = () => render(<BigNumbers sectionColour="#636C17" />);

describe('BigNumbers', () => {
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
      <BigNumbers sectionColour="#636C17" />
    );
    await findByText('Placeholder');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the wide component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    const { asFragment } = renderBigNumbers();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the standard component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapperStandard());
    const { asFragment } = renderBigNumbers();
    expect(asFragment()).toMatchSnapshot();
  });

  it('click show all', async () => {
    const { asFragment, getByText, findByText } = render(
      <BigNumbers sectionColour="#636C17" />
    );
    fireEvent.click(getByText('Show all'));
    await findByText('Collapse');
    expect(asFragment()).toMatchSnapshot();
  });
});
