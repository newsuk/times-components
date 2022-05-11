import { resizeImage } from '../resizeImage';

describe('resizeImage', () => {
  it('should return an unchanged image url', () => {
    const url = 'https://www.example.com/image/3:2';
    const img = resizeImage(url, 400);
    expect(img).toBe(url);
  });

  it('should return the correct resize value', () => {
    const url =
      'https://www.thetimes.co.uk/imageserver/ba38f794-0c0065c91324.jpg?crop=1600%2C900%2C0%2C0';
    const img = resizeImage(url, 400);
    expect(img).toBe(`${url}&resize=480`);
  });

  it('should return prod image url from uat domain', () => {
    const url =
      'https://www.uat-thetimes.co.uk/imageserver/ba38f794-0c0065c91324.jpg';
    const img = resizeImage(url, 300);
    expect(img).toBe(
      `https://www.thetimes.co.uk/imageserver/ba38f794-0c0065c91324.jpg?resize=320`
    );
  });
});
