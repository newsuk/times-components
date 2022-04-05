import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { InlineDialog } from '../InlineDialog';

describe('<InlineDialog>', () => {
  it('should render the component', () => {
    const onClick = jest.fn();
    const { baseElement, getByText } = render(
      <InlineDialog title="Title" buttonText="Button" onClick={onClick} />
    );
    expect(getByText('Title')).toBeTruthy();
    const button = getByText('Button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    expect(button).toBeTruthy();

    expect(baseElement).toMatchSnapshot();
  });
});
