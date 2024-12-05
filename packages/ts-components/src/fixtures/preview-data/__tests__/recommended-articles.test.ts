import data from '../recommended-articles';

describe('Recommendations Data', () => {
  const articles = data.recommendations.articles;

  it('should contain an array of articles', () => {
    expect(Array.isArray(articles)).toBe(true);
  });

  it('should ensure each article has required properties', () => {
    articles.forEach(article => {
      expect(article).toHaveProperty('url');
      expect(article).toHaveProperty('categoryPath');
      expect(article).toHaveProperty('slug');
      expect(article).toHaveProperty('headline');
      expect(article).toHaveProperty('publishedDateTime');
      expect(article).toHaveProperty('summary');
      expect(article).toHaveProperty('media');
    });
  });

  it('should validate the "url" of each article', () => {
    articles.forEach(article => {
      expect(typeof article.url).toBe('string');
      expect(article.url).toMatch(/^https?:\/\//);
    });
  });

  it('should validate "publishedDateTime" is a valid ISO date string', () => {
    articles.forEach(article => {
      expect(new Date(article.publishedDateTime).toString()).not.toBe(
        'Invalid Date'
      );
    });
  });

  it('should ensure "summary.children" contains only text nodes', () => {
    articles.forEach(article => {
      article.summary.children.forEach(child => {
        expect(typeof child.text).toBe('string');
      });
    });
  });

  it('should ensure labels are either null or strings', () => {
    articles.forEach(article => {
      expect([null, 'string']).toContain(typeof article.label);
    });
  });
});
