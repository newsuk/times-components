import React from 'react';
import { HowToPlay } from '../index';
import { render, fireEvent } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('HowToPlay component', () => {
  it('renders HowToPlay component with default props', () => {
    const { container } = render(<HowToPlay />);
    expect(container).toMatchSnapshot();
  });

  it('renders with custom title and header', () => {
    const { container } = render(
      <HowToPlay title="Custom Title" header="Custom Header" />
    );
    expect(container).toMatchSnapshot();
  });

  it('opens the modal when the button is clicked', () => {
    const { getByText, getByTestId } = render(<HowToPlay />);
    const openButton = getByTestId('modal-open-button');
    fireEvent.click(openButton);
    const modalHeader = getByText('How to play Today’s Mini Quiz');
    expect(modalHeader).toBeInTheDocument();
  });

  it('renders list items when listItems prop is provided', () => {
    const listItems = ['Item 1', 'Item 2', 'Item 3'];
    const { getByTestId, queryByText } = render(
      <HowToPlay listItems={listItems} />
    );
    const openButton = getByTestId('modal-open-button');

    fireEvent.click(openButton);

    listItems.forEach(item => {
      const listItemElement = queryByText(item);
      expect(listItemElement).toBeInTheDocument();
    });
  });
});
