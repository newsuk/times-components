const clickEvent  = (title: string, parent: string = '') => ({
  object: 'ArticleSidebar',
  action: 'Clicked',
  attrs: {
    event_navigation_action: 'navigation',
    event_navigation_name: `${title}`,
    event_navigation_browsing_method: 'click',
    component_name: 'Article Sidebar',
    ...(parent && { article_parent_name: parent.toLowerCase() })
  }
});

const handleClick = (
  fireAnalyticsEvent: ((analyticsEvent: any) => void) | undefined,
  title: string,
  parent?: string
) => {
  fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(title, parent));
};

export { handleClick, clickEvent };
