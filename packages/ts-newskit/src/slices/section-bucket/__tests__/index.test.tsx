import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { SectionBucket } from '../index';
import {
  articleStackOne,
  articleStackTwo,
  articleStackThree,
  articleStackFour
} from '../../fixtures/data.json';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const renderComponent = () =>
  render(
    <SectionBucket
      articleStackOne={articleStackOne}
      articleStackTwo={articleStackTwo}
      articleStackThree={articleStackThree}
      articleStackFour={articleStackFour}
    />
  );

describe('Render SectionBucket Slice', () => {
  test('Slice matches snapshot with sm', () => {
    (useBreakpointKey as any).mockReturnValue('sm');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('Slice matches snapshot with xl', () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
