import React, { FC } from 'react';
import { render } from '@testing-library/react';

import 'regenerator-runtime';

import _fetchMock from 'isomorphic-unfetch';
const fetchMock = _fetchMock as any;

import { FetchProvider, useFetch } from '../FetchProvider';

const TestComponent: FC<{}> = () => {
  try {
    const { loading, error, data } = useFetch<{ value: string }>();

    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>Error</div>;
    }

    return <div>{data!.value}</div>;
  } catch {
    return <div>Error</div>;
  }
};

describe('<FetchProvider>', () => {
  afterEach(() => {
    fetchMock.restore();
    fetchMock.reset();
  });

  const endpoint = 'http://localhost:123';

  it('fetch', async () => {
    const value = 'Fetched';
    fetchMock.mock(endpoint, { status: 200, body: { value } });

    const { asFragment, getByText, findByText } = render(
      <FetchProvider url={endpoint}>
        <TestComponent />
      </FetchProvider>
    );

    getByText('Loading');
    expect(asFragment()).toMatchSnapshot();

    await findByText(value);
    expect(asFragment()).toMatchSnapshot();
  });

  it('error', async () => {
    fetchMock.mock(endpoint, { status: 500 });

    const { asFragment, findByText } = render(
      <FetchProvider url={endpoint}>
        <TestComponent>Children</TestComponent>
      </FetchProvider>
    );

    await findByText('Error');
    expect(asFragment()).toMatchSnapshot();
  });

  it('Unprovided', async () => {
    const { asFragment, findByText } = render(
      <TestComponent>Children</TestComponent>
    );

    await findByText('Error');
    expect(asFragment()).toMatchSnapshot();
  });

  it('preview', async () => {
    const value = 'Preloaded';

    const { asFragment, findByText } = render(
      <FetchProvider previewData={{ value }}>
        <TestComponent />
      </FetchProvider>
    );
    // Await artificial delay
    setTimeout(async () => {
      await findByText(value);
      expect(asFragment()).toMatchSnapshot();
    }, 2000);
  });
});
