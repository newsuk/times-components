import React from 'react';
import { render } from '../../../../utils/test-utils';
import { CustomTextBlock } from '../customTextBlock';
import '@testing-library/jest-dom';

describe('CustomTextBlock', () => {
  it('renders text and icon', () => {
    const text = 'Hello, world!';

    const { getByText } = render(<CustomTextBlock text={text} />);

    const textElement = getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  it('renders nothing when text is null', () => {
    const { container } = render(<CustomTextBlock text={null} />);
    expect(container.firstChild).toBeNull();
  });
});
