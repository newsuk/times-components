import { tealiumTrackingHandler, replaceUrl, truncateText } from '../utils';

describe('tealiumTrackingHandler', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    global.window.utag = {
      link: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls utag.link with the correct parameters', () => {
    const articleParentName = 'Test Article Parent';
    const sectionDetails = 'Test Section';

    tealiumTrackingHandler(articleParentName, sectionDetails);

    global.window.utag &&
      expect(global.window.utag.link).toHaveBeenCalledWith({
        event_navigation_action: 'navigation',
        event_navigation_name: 'travel contents card selection',
        event_navigation_browsing_method: 'click',
        article_parent_name: articleParentName,
        section_details: sectionDetails,
      });
  });
});

describe('replaceUrl', () => {
  it('returns an empty string if url is not provided', () => {
    expect(replaceUrl('')).toBe('');
  });

  it('returns the pathname of a given URL', () => {
    const url = 'https://example.com/path/to/resource';
    expect(replaceUrl(url)).toBe('/path/to/resource');
  });
});

describe('truncateText', () => {
  it('returns the original text if it is shorter than or equal to the maxLength', () => {
    const text = 'Short text';
    const maxLength = 20;
    expect(truncateText(text, maxLength)).toBe(text);
  });

  it('truncates text to the maxLength and appends ellipsis', () => {
    const text = 'This is a longer piece of text that needs to be truncated.';
    const maxLength = 20;
    expect(truncateText(text, maxLength)).toBe('This is a longer...');
  });

  it('truncates text at the last space within the maxLength and appends ellipsis', () => {
    const text = 'This is a longer piece of text that needs truncating.';
    const maxLength = 25;
    expect(truncateText(text, maxLength)).toBe('This is a longer piece...');
  });
});
