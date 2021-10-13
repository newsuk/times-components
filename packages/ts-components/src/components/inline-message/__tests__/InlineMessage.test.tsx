import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { InlineMessage } from '../InlineMessage';

describe('<InlineMessage>', () => {
  it('should render the component', () => {
    const { baseElement, getByText } = render(
      <InlineMessage title="Title" type="info" />
    );
    expect(getByText('Title')).toBeTruthy();
    expect(baseElement.getElementsByClassName('info').length).toEqual(1);
    expect(baseElement).toMatchSnapshot();
  });
});
