declare global {
  interface Window {
    utag: {
      link: (params: Record<string, any>) => void;
    };
  }
}

export const tealiumTrackingHandler = (
  articleParentName: string,
  sectionDetails: string
) => {
  global.window.utag.link({
    event_navigation_action: 'navigation',
    event_navigation_name: 'travel contents card selection',
    event_navigation_browsing_method: 'click',
    article_parent_name: `${articleParentName}`,
    section_details: `${sectionDetails}`
  });
};

// This function will replace all times.co.uk with .com
export const replaceUrl = (url: string): string => {
  if (!url) {
    return '';
  }

  const oldUrl = new URL(url);
  return oldUrl.pathname;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  let truncatedText = text.slice(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    truncatedText = truncatedText.slice(0, lastSpaceIndex);
  }

  return `${truncatedText}...`;
};
