import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ArticleHeader } from '../ArticleHeader';

const dateNow = () => Date.now();

describe('ArticleHeader', () => {
  it('should render the breaking flag if present', () => {
    const { baseElement } = render(
      <ArticleHeader
        updated="2021-12-31T23:30:00Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('should render the time since publishing if that time is more than a minute before the current time', () => {
    const realDatenow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => '2022-02-11T11:30:00Z');
    global.Date.now = dateNowStub;

    const { baseElement } = render(
      <ArticleHeader
        updated="2022-02-11T11:29:30Z"
        breaking={true}
        headline="This%20is%20the%20headline"
      />
    );
    expect(baseElement).toMatchSnapshot();
    global.Date.now = realDateNow;
  });
});
