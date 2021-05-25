import { getImageByRatio, getImageAltText } from '../getImage';

describe('getArticle :: getImageByRatio', () => {
  it('should return the correct image url', () => {
    const article = {
      id: '111',
      images: {
        crops: [{ ratio: '16:9', url: 'https://dummyimage.com/300' }]
      },
      headline: '',
      url: ''
    };

    const image = getImageByRatio('16:9', article);
    expect(image && image.url).toBe(article.images.crops[0].url);
  });
});

describe('getArticle :: getImageAltText', () => {
  it('should return the correct image alt text', () => {
    const article = {
      id: '1111',
      images: { alt: 'Some example text', crops: [] },
      headline: '',
      url: ''
    };

    const text = getImageAltText(article);
    expect(text).toBe(article.images.alt);
  });
});
