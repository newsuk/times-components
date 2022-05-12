import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Headline } from '../Headline';

const mockFireEvent = jest.fn();

const article = {
  images: { crops: [] },
  headline: 'Some example headline',
  url: ''
};

describe('<Headline />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should not render if the headline attribute is empty in the article object', () => {
    const { asFragment } = render(
      <Headline article={{ images: { crops: [] }, headline: '', url: '' }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render headline component correctly', () => {
    const { getByText } = render(<Headline article={article} />);

    getByText(article.headline);
  });

  it('should fire the correct event when the headline clicked', () => {
    const { getByText } = render(
      <Headline article={article} clickHandler={mockFireEvent} />
    );

    fireEvent.click(getByText(article.headline));

    expect(mockFireEvent).toHaveBeenCalled();
  });
});
