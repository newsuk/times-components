import React from 'react';
import '@testing-library/jest-dom';
import { CommentBucket1 } from '..';
import { data } from '../../fixtures/data.json';
import { renderComponent } from '../../../utils';

afterAll(() => {
  jest.clearAllMocks();
});
const clickHandler = jest.fn();

describe('Render Comment Bucket 1 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(
      <CommentBucket1 data={data} clickHandler={clickHandler} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
