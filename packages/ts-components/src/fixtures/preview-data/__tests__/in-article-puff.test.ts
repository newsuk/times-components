import data from '../in-article-puff';

describe('Data Structure Tests', () => {
  it('should have the correct top-level keys', () => {
    const keys = Object.keys(data);
    expect(keys).toEqual(expect.arrayContaining(['41547', '41548']));
  });

  it('should validate the body structure for 41547', () => {
    const { body } = data[41547];
    expect(body).toHaveProperty('data');
    expect(body.data).toBeInstanceOf(Array);

    body.data.forEach((item: any) => {
      expect(item).toHaveProperty('type', 'puff');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          label: expect.any(String),
          headline: expect.any(String),
          copy: expect.any(String),
          link: expect.any(String),
          linkText: expect.any(String)
        })
      );
    });
  });

  it('should validate the body structure for 41548', () => {
    const { body } = data[41548];
    expect(body).toHaveProperty('data');
    expect(body.data).toBeInstanceOf(Array);

    body.data.forEach((item: any) => {
      expect(item).toHaveProperty('type', 'puff');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.stringMatching(/^https?:\/\/.+/), // Ensure image is a valid URL
          label: expect.any(String),
          headline: expect.any(String),
          copy: expect.any(String),
          link: expect.stringMatching(/^https?:\/\/.+/), // Ensure link is a valid URL
          linkText: expect.any(String)
        })
      );
    });
  });

  it('should handle entries with empty fields gracefully', () => {
    const { body } = data[41547];
    body.data.forEach((item: any) => {
      if (!item.data.image) {
        expect(item.data.image).toBe(''); // Check that image can be empty
      }
      if (!item.data.linkText) {
        expect(item.data.linkText).toBe(''); // Check that linkText can be empty
      }
    });
  });

  it('should validate that images and links are not empty for 41548', () => {
    const { body } = data[41548];
    body.data.forEach((item: any) => {
      expect(item.data.image).toMatch(/^https?:\/\/.+/);
      expect(item.data.link).toMatch(/^https?:\/\/.+/);
    });
  });

  it('should validate the headline and copy content', () => {
    Object.values(data).forEach((entry: any) => {
      entry.body.data.forEach((item: any) => {
        expect(item.data.headline).toMatch(/How to build your own house/);
        expect(item.data.copy).toMatch(/<b>Help to Build<\/b>/); // Ensure bold tag exists
        expect(item.data.copy).toMatch(/<i>before<\/i>/); // Ensure italic tag exists
      });
    });
  });
});
