import React, { FC } from 'react';
import { render } from '@testing-library/react';

import 'regenerator-runtime';
import '@testing-library/jest-dom';

import { FetchProvider, useFetch } from '../FetchProvider';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

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
  beforeEach(() => {
    // if you have an existing `beforeEach` just add the following line to it
    fetchMock.doMock();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('fetch', async () => {
    fetchMock.mockResponse(async () => ({ body: '{ "value" : "boo" }' }));

    const { asFragment, findByText } = render(
      <FetchProvider url="http://localhost:123">
        <TestComponent />
      </FetchProvider>
    );
    await findByText('boo');

    expect(asFragment()).toMatchSnapshot();
  });

  it('loading', async () => {
    fetchMock.mockResponse(async () => ({ body: '{ "value" : "boo" }' }));

    const { asFragment, findByText } = render(
      <FetchProvider url="http://thetimes.co.uk">
        <TestComponent />
      </FetchProvider>
    );
    await findByText('Loading');

    expect(asFragment()).toMatchSnapshot();
  });

  it('error', async () => {
    fetchMock.mockResponse(() => Promise.reject('error'));

    const { asFragment, findByText } = render(
      <FetchProvider url="http://thetimes.co.uk">
        <TestComponent>Children</TestComponent>
      </FetchProvider>
    );
    await findByText('Error');

    expect(asFragment()).toMatchSnapshot();
  });

  it('Unprovided', async () => {
    fetchMock.mockResponse(async () => ({ body: '{ "value" : "boo" }' }));

    const { asFragment, findByText } = render(
      <TestComponent>Children</TestComponent>
    );
    await findByText('Error');

    expect(asFragment()).toMatchSnapshot();
  });

  it('preview', () => {
    const { asFragment, getByText } = render(
      <FetchProvider previewData={{ value: 'boo' }}>
        <TestComponent />
      </FetchProvider>
    );

    expect(getByText('boo'));
    expect(asFragment()).toMatchSnapshot();
  });
});
