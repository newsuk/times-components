import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FakeIntersectionObserver from '../../../../utils/FakeIntersectionObserver';
import { Image } from '../Image';

const mockFireEvent = jest.fn();

const article = {
  images: {
    alt: 'image alt text',
    crops: [{ ratio: '3:2', url: 'https://dummyimage.com/300' }]
  },
  headline: '',
  url: ''
};

const schema = { sm: { imageRatio: '3:2' } };

describe('<Image />', () => {
  let oldIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    oldIntersectionObserver = window.IntersectionObserver;

    // @ts-ignore
    window.IntersectionObserver = FakeIntersectionObserver;
  });

  afterEach(() => {
    window.IntersectionObserver = oldIntersectionObserver;
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render image component correctly', () => {
    const { asFragment, getByAltText } = render(
      <Image article={article} displaySchema={schema} />
    );

    getByAltText('image alt text');

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should fire the correct event when the image clicked', () => {
    const { getByAltText } = render(
      <Image
        article={article}
        displaySchema={schema}
        clickHandler={mockFireEvent}
      />
    );
    FakeIntersectionObserver.intersect();
    fireEvent.click(getByAltText('image alt text'));

    expect(mockFireEvent).toHaveBeenCalled();
  });
});
