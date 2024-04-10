import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { Banner } from '../';

describe('Banner', () => {
  it('renders the banner', () => {
    const { asFragment } = render(
      <Banner title="Title" body="Body" onClose={jest.fn} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
