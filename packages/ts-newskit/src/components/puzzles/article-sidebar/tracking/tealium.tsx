import { EventTrigger } from 'newskit';

export const sidebarClickEvent = () => ({
  originator: 'Puzzle Sidebar',
  trigger: EventTrigger.Click,
  context: {
    event_navigation_action: 'navigation',
    event_navigation_name: 'puzzle sidebar: header selected',
    event_navigation_browsing_method: 'click'
  }
});
