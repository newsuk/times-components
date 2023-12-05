import { EventTrigger } from 'newskit';

export const getTopNavClickEvent = (title: string, section: string) => ({
  originator: section,
  trigger: EventTrigger.Click,
  context: {
    event_navigation_action: 'navigation',
    event_navigation_name: 'header:selection',
    event_navigation_browsing_method: 'click',
    article_parent_name: `${section} : ${title.toLowerCase()}`
  }
});
