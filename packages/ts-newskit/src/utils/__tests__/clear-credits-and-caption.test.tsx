import {
  clearCreditsAndCaption,
  ArticleProps
} from '../clear-credits-and-caption';

describe('clearCreditsAndCaptionObject', () => {
  it('should clear credits and caption of a single ArticleProps object', () => {
    const leadArticle: ArticleProps = {
      id: '1234',
      headline: 'Example Headline',
      url: '',
      images: {
        alt: 'Example Alt Text',
        credits: 'Example Credits',
        caption: 'Example Caption',
        crops: []
      }
    };

    const updatedLeadArticle = clearCreditsAndCaption(leadArticle);
    if (updatedLeadArticle && updatedLeadArticle.images) {
      expect(updatedLeadArticle.images.credits).toBe('');
      expect(updatedLeadArticle.images.caption).toBe('');
    }
  });
});
