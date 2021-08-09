const clickEvent = (buttonLabel: string, headline: string) => ({
  action: 'Clicked',
  object: 'InArticleRelatedArticles',
  attrs: {
    event_navigation_name: `button : ${buttonLabel}${
      buttonLabel === 'image' || buttonLabel === 'headline'
        ? ` : ${headline}`
        : ''
    }`,
    event_navigation_browsing_method: 'click',
    component_name: `related article : ${headline}`
  }
});

export const handleClick = (
  fireAnalyticsEvent: ((analyticsEvent: any) => void) | undefined,
  buttonLabel: string,
  headline: string
) => {
  fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(buttonLabel, headline));
};
