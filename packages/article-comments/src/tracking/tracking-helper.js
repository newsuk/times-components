const event = (navigationName, browsingMethod) => ({
  attrs: {
    event_navigation_name: `${navigationName}`,
    event_navigation_browsing_method: `${browsingMethod}`
  }
});

const handleClick = (fireAnalyticsEvent, navigationName, browsingMethod) => {
  if (fireAnalyticsEvent) {
    fireAnalyticsEvent(event(navigationName, browsingMethod));
  }
};

export { handleClick, event };
