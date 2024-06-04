import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { Message } from '../message';
import { screen } from '@testing-library/react';

const setClosed = jest.fn();

const message =
  "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this.";

describe('Message Component', () => {
  it('should render snapshot', () => {
    const { asFragment } = render(
      <Message setClosed={setClosed} closed={false} message={message} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Message', () => {
    render(<Message setClosed={setClosed} closed={false} message={message} />);
    const messageText = screen.getByText(message);
    expect(messageText).toBeInTheDocument();
  });
});
