const clickEvent = (title: string) => ({
  object: 'QuizleSidebar',
  action: 'Clicked',
  attrs: {
    event_navigation_action: 'navigation',
    event_navigation_name: `${title}`,
    event_navigation_browsing_method: 'click',
    component_name: 'Quizle Sidebar'
  }
});

const handleClick = (
  fireAnalyticsEvent: ((analyticsEvent: any) => void) | undefined,
  title: string
) => {
  fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(title));
};

export { handleClick, clickEvent };
