import { clearCreditsAndCaption } from '../clear-credits-and-caption';
import { LeadArticleProps } from '../../components/slices/lead-article';

describe('clearCreditsAndCaptionObject', () => {
  it('should clear credits and caption of a single ArticleProps object', () => {
    const leadArticle: LeadArticleProps = {
      hasVideo: false,
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
