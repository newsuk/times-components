import { getResponsiveNavData } from '../getResponsiveNavData';
import { mainMenuItems } from '../../components/navigation/global-nav/fixtures/data.json';

const RESULT_ONE = {
  charWidth: 1160,
  responsiveMenuData: [
    {
      lg: false,
      md: false,
      slug: 'home',
      title: 'Home',
      url: '/home',
      xl: false,
      xxl: false
    },
    {
      items: [
        { slug: 'uk', title: 'Top Stories', url: '/uk' },
        { slug: 'politics', title: 'Politics', url: '/uk/politics' },
        { slug: 'health', title: 'Health', url: '/uk/health' },
        { slug: 'science', title: 'Science', url: '/uk/science' },
        { slug: 'environment', title: 'Environment', url: '/uk/environment' },
        { slug: 'education', title: 'Education', url: '/uk/education' },
        { slug: 'law', title: 'Law', url: '/uk/law' },
        {
          slug: 'royal-family',
          title: 'Royal Family',
          url: '/uk/royal-family'
        },
        { slug: 'obituaries', title: 'Obituaries', url: '/uk/obituaries' },
        {
          slug: 'investigations',
          title: 'Investigations',
          url: '/uk/investigations'
        }
      ],
      lg: false,
      md: false,
      slug: 'uk',
      title: 'UK',
      url: '/uk',
      xl: false,
      xxl: false
    },
    {
      items: [
        { slug: 'world', title: 'Top Stories', url: '/world' },
        { slug: 'us-canada', title: 'US & Canada', url: '/world/us-canada' },
        {
          slug: 'russia-ukraine-war',
          title: 'Russia-Ukraine war',
          url: '/world/russia-ukraine-war'
        },
        { slug: 'europe', title: 'Europe', url: '/world/europe' },
        { slug: 'ireland', title: 'Ireland', url: '/world/ireland' },
        { slug: 'asia', title: 'Asia', url: '/world/asia' },
        {
          slug: 'latin-america',
          title: 'Latin America',
          url: '/world/latin-america'
        },
        {
          slug: 'middle-east',
          title: 'Middle East',
          url: '/world/middle-east'
        },
        { slug: 'africa', title: 'Africa', url: '/world/africa' },
        { slug: 'australasia', title: 'Australasia', url: '/world/australasia' }
      ],
      lg: false,
      md: false,
      slug: 'world',
      title: 'World',
      url: '/world',
      xl: false,
      xxl: false
    },
    {
      items: [
        { slug: 'comment', title: 'Today', url: '/comment' },
        { slug: 'columnists', title: 'Columnists', url: '/comment/columnists' },
        {
          slug: 'the-times-view',
          title: 'The Times view',
          url: '/comment/the-times-view'
        },
        {
          slug: 'letters-to-editor',
          title: 'Letters to the Editor',
          url: '/comment/letters-to-editor'
        },
        { slug: 'cartoons', title: 'Cartoons', url: '/comment/cartoons' },
        { slug: 'register', title: 'Register', url: '/comment/register' }
      ],
      lg: false,
      md: false,
      slug: 'comment',
      title: 'Comment',
      url: '/comment',
      xl: false,
      xxl: false
    },
    {
      items: [
        { slug: 'top-stories', title: 'Top Stories', url: '/life-style' }
      ],
      lg: false,
      md: false,
      slug: 'life-style',
      title: 'Life & Style',
      url: '/life-style',
      xl: false,
      xxl: false
    },
    {
      items: [
        { slug: 'culture-books', title: 'Top Stories', url: '/culture-books' },
        {
          slug: 'tv-audio',
          title: 'TV & Audio',
          url: '/culture-books/tv-audio'
        },
        { slug: 'film', title: 'Film', url: '/culture-books/film' },
        { slug: 'books', title: 'Books', url: '/culture-books/books' },
        { slug: 'music', title: 'Music', url: '/culture-books/music' },
        { slug: 'theatre', title: 'Theatre', url: '/culture-books/theatre' },
        {
          slug: 'opera-dance',
          title: 'Opera & Dance',
          url: '/culture-books/opera-dance'
        },
        {
          slug: 'art-design',
          title: 'Art & Design',
          url: '/culture-books/art-design'
        }
      ],
      lg: false,
      md: false,
      slug: 'culture-books',
      title: 'Culture & Books',
      url: '/culture-books',
      xl: false,
      xxl: false
    },
    {
      items: [
        {
          slug: 'business-money',
          title: 'Top Stories',
          url: '/business-money'
        },
        { slug: 'money', title: 'Money', url: '/business-money/money' },
        {
          slug: 'economics',
          title: 'Economics',
          url: '/business-money/economics'
        },
        { slug: 'markets', title: 'Markets', url: '/business-money/markets' },
        {
          slug: 'entrepreneurs',
          title: 'Entrepreneurs',
          url: '/business-money/entrepreneurs'
        },
        {
          slug: 'technology',
          title: 'Technology',
          url: '/business-money/technology'
        },
        {
          slug: 'companies',
          title: 'Companies',
          url: '/business-money/companies'
        }
      ],
      lg: false,
      md: true,
      slug: 'business-money',
      title: 'Business and Money',
      url: '/business-money',
      xl: false,
      xxl: false
    },
    {
      items: [
        { slug: 'top-stories', title: 'Top Stories', url: '/sport' },
        { slug: 'football', title: 'Football', url: '/sport/football' },
        { slug: 'cricket', title: 'Cricket', url: '/topic/cricket' },
        {
          slug: 'rugby-union',
          title: 'Rugby Union',
          url: '/topic/rugby-union'
        },
        { slug: 'formula-one', title: 'Formula 1', url: '/topic/formula-one' },
        { slug: 'tennis', title: 'Tennis', url: '/topic/tennis' },
        { slug: 'golf', title: 'Golf', url: '/topic/golf' },
        { slug: 'all-sport', title: 'Other Sport', url: '/sport/all-sport' }
      ],
      lg: false,
      md: true,
      slug: 'sport',
      title: 'Sport',
      url: '/sport',
      xl: false,
      xxl: false
    },
    {
      items: [{ slug: 'puzzles', title: 'Todays Puzzles', url: '/puzzles' }],
      lg: true,
      md: true,
      slug: 'puzzles',
      title: 'Puzzles',
      url: '/puzzles',
      xl: false,
      xxl: false
    },
    {
      items: [
        {
          slug: 'sunday-times-magazine',
          title: 'The Sunday Times Magazine',
          url: '/magazines/sunday-times-magazine'
        },
        { slug: 'culture', title: 'Culture', url: '/magazines/culture' },
        { slug: 'style', title: 'Style', url: '/magazines/style' },
        {
          slug: 'times-magazine',
          title: 'The Times Magazine',
          url: '/magazines/times-magazine'
        }
      ],
      lg: true,
      md: true,
      slug: 'magazines',
      title: 'Magazines',
      url: '/magazines',
      xl: false,
      xxl: false
    }
  ],
  showMoreLG: true,
  showMoreMD: true,
  showMoreXL: false,
  showMoreXXL: false
};
const RESULT_TWO = {
  charWidth: 1160,
  responsiveMenuData: [
    {
      lg: false,
      md: false,
      slug: 'home',
      title: 'Home',
      url: '/home',
      xl: false
    },
    {
      items: [
        { slug: 'uk', title: 'Top Stories', url: '/uk' },
        { slug: 'politics', title: 'Politics', url: '/uk/politics' },
        { slug: 'health', title: 'Health', url: '/uk/health' },
        { slug: 'science', title: 'Science', url: '/uk/science' },
        { slug: 'environment', title: 'Environment', url: '/uk/environment' },
        { slug: 'education', title: 'Education', url: '/uk/education' },
        { slug: 'law', title: 'Law', url: '/uk/law' },
        {
          slug: 'royal-family',
          title: 'Royal Family',
          url: '/uk/royal-family'
        },
        { slug: 'obituaries', title: 'Obituaries', url: '/uk/obituaries' },
        {
          slug: 'investigations',
          title: 'Investigations',
          url: '/uk/investigations'
        }
      ],
      lg: false,
      md: false,
      slug: 'uk',
      title: 'UK',
      url: '/uk',
      xl: false
    },
    {
      items: [
        { slug: 'world', title: 'Top Stories', url: '/world' },
        { slug: 'us-canada', title: 'US & Canada', url: '/world/us-canada' },
        {
          slug: 'russia-ukraine-war',
          title: 'Russia-Ukraine war',
          url: '/world/russia-ukraine-war'
        },
        { slug: 'europe', title: 'Europe', url: '/world/europe' },
        { slug: 'ireland', title: 'Ireland', url: '/world/ireland' },
        { slug: 'asia', title: 'Asia', url: '/world/asia' },
        {
          slug: 'latin-america',
          title: 'Latin America',
          url: '/world/latin-america'
        },
        {
          slug: 'middle-east',
          title: 'Middle East',
          url: '/world/middle-east'
        },
        { slug: 'africa', title: 'Africa', url: '/world/africa' },
        { slug: 'australasia', title: 'Australasia', url: '/world/australasia' }
      ],
      lg: false,
      md: false,
      slug: 'world',
      title: 'World',
      url: '/world',
      xl: false
    },
    {
      items: [
        { slug: 'comment', title: 'Today', url: '/comment' },
        { slug: 'columnists', title: 'Columnists', url: '/comment/columnists' },
        {
          slug: 'the-times-view',
          title: 'The Times view',
          url: '/comment/the-times-view'
        },
        {
          slug: 'letters-to-editor',
          title: 'Letters to the Editor',
          url: '/comment/letters-to-editor'
        },
        { slug: 'cartoons', title: 'Cartoons', url: '/comment/cartoons' },
        { slug: 'register', title: 'Register', url: '/comment/register' }
      ],
      lg: false,
      md: true,
      slug: 'comment',
      title: 'Comment',
      url: '/comment',
      xl: false
    },
    {
      items: [
        { slug: 'top-stories', title: 'Top Stories', url: '/life-style' }
      ],
      lg: false,
      md: true,
      slug: 'life-style',
      title: 'Life & Style',
      url: '/life-style',
      xl: false
    },
    {
      items: [
        { slug: 'culture-books', title: 'Top Stories', url: '/culture-books' },
        {
          slug: 'tv-audio',
          title: 'TV & Audio',
          url: '/culture-books/tv-audio'
        },
        { slug: 'film', title: 'Film', url: '/culture-books/film' },
        { slug: 'books', title: 'Books', url: '/culture-books/books' },
        { slug: 'music', title: 'Music', url: '/culture-books/music' },
        { slug: 'theatre', title: 'Theatre', url: '/culture-books/theatre' },
        {
          slug: 'opera-dance',
          title: 'Opera & Dance',
          url: '/culture-books/opera-dance'
        },
        {
          slug: 'art-design',
          title: 'Art & Design',
          url: '/culture-books/art-design'
        }
      ],
      lg: true,
      md: true,
      slug: 'culture-books',
      title: 'Culture & Books',
      url: '/culture-books',
      xl: false
    },
    {
      items: [
        {
          slug: 'business-money',
          title: 'Top Stories',
          url: '/business-money'
        },
        { slug: 'money', title: 'Money', url: '/business-money/money' },
        {
          slug: 'economics',
          title: 'Economics',
          url: '/business-money/economics'
        },
        { slug: 'markets', title: 'Markets', url: '/business-money/markets' },
        {
          slug: 'entrepreneurs',
          title: 'Entrepreneurs',
          url: '/business-money/entrepreneurs'
        },
        {
          slug: 'technology',
          title: 'Technology',
          url: '/business-money/technology'
        },
        {
          slug: 'companies',
          title: 'Companies',
          url: '/business-money/companies'
        }
      ],
      lg: true,
      md: true,
      slug: 'business-money',
      title: 'Business and Money',
      url: '/business-money',
      xl: true
    },
    {
      items: [
        { slug: 'top-stories', title: 'Top Stories', url: '/sport' },
        { slug: 'football', title: 'Football', url: '/sport/football' },
        { slug: 'cricket', title: 'Cricket', url: '/topic/cricket' },
        {
          slug: 'rugby-union',
          title: 'Rugby Union',
          url: '/topic/rugby-union'
        },
        { slug: 'formula-one', title: 'Formula 1', url: '/topic/formula-one' },
        { slug: 'tennis', title: 'Tennis', url: '/topic/tennis' },
        { slug: 'golf', title: 'Golf', url: '/topic/golf' },
        { slug: 'all-sport', title: 'Other Sport', url: '/sport/all-sport' }
      ],
      lg: true,
      md: true,
      slug: 'sport',
      title: 'Sport',
      url: '/sport',
      xl: true
    },
    {
      items: [{ slug: 'puzzles', title: 'Todays Puzzles', url: '/puzzles' }],
      lg: true,
      md: true,
      slug: 'puzzles',
      title: 'Puzzles',
      url: '/puzzles',
      xl: true
    },
    {
      items: [
        {
          slug: 'sunday-times-magazine',
          title: 'The Sunday Times Magazine',
          url: '/magazines/sunday-times-magazine'
        },
        { slug: 'culture', title: 'Culture', url: '/magazines/culture' },
        { slug: 'style', title: 'Style', url: '/magazines/style' },
        {
          slug: 'times-magazine',
          title: 'The Times Magazine',
          url: '/magazines/times-magazine'
        }
      ],
      lg: true,
      md: true,
      slug: 'magazines',
      title: 'Magazines',
      url: '/magazines',
      xl: true
    }
  ],
  showMoreLG: true,
  showMoreMD: true,
  showMoreXL: true,
  showMoreXXL: false
};

describe('getResponsiveNavData', () => {
  it('returns correct shape of objects', () => {
    expect(
      getResponsiveNavData(mainMenuItems, {
        md: 768,
        lg: 1024,
        xl: 1440,
        xxl: 1770
      })
    ).toEqual(RESULT_ONE);
  });
  it('returns correct shape of objects', () => {
    expect(
      getResponsiveNavData(mainMenuItems, {
        md: 300,
        lg: 500,
        xl: 800
      })
    ).toEqual(RESULT_TWO);
  });
});
