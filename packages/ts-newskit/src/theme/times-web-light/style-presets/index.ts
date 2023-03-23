import { breadcrumbStylePresets } from './breadcrumb';
import { colorStylePresets } from './color';
import { leadStoryStylePresets } from './lead-story';
import { mastheadStylePresets } from './masthead';
import { menuStylePresets } from './menu';
import { navStylePresets } from './navigation';
import { pageStylePresets } from './page';
import { secondaryNavigationStylePresets } from './secondary-nav';
import { textStylePresets } from './text';

export const stylePresets = {
  ...breadcrumbStylePresets,
  ...colorStylePresets,
  ...mastheadStylePresets,
  ...pageStylePresets,
  ...textStylePresets,
  ...menuStylePresets,
  ...navStylePresets,
  ...secondaryNavigationStylePresets,
  ...leadStoryStylePresets
};
