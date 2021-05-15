import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Image } from '../Image';

const mockFireEvent = jest.fn();

jest.mock('../LazyImage/LazyImage', () => ({
  LazyImage: (props: { url?: string }) => (
    <div>
      <div>LazyImage</div>
      <div>{props.url}</div>
    </div>
  )
}));

const article = {
  images: { crops: [{ ratio: '3:2', url: 'https://dummyimage.com/300' }] },
  headline: '',
  url: ''
};

const schema = { sm: { imageRatio: '3:2' } };

describe('<Image />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render image component correctly', () => {
    const { asFragment, getByText } = render(
      <Image article={article} displaySchema={schema} />
    );

    getByText('LazyImage');
    getByText(article.images.crops[0].url);

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should fire the correct event when the image clicked', () => {
    const { getByText } = render(
      <Image
        article={article}
        displaySchema={schema}
        clickHandler={mockFireEvent}
      />
    );

    fireEvent.click(getByText('LazyImage'));

    expect(mockFireEvent).toHaveBeenCalled();
  });
});
