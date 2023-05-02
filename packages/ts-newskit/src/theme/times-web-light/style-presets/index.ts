import { articleListStylePresets } from './articlelist';
import { breadcrumbStylePresets } from './breadcrumb';
import { colorStylePresets } from './color';
import { leadStoryStylePresets } from './lead-story';
import { mastheadStylePresets } from './masthead';
import { menuStylePresets } from './menu';
import { navStylePresets } from './navigation';
import { pageStylePresets } from './page';
import { secondaryNavigationStylePresets } from './secondary-nav';
import { sliceStylePresets } from './slices';
import { textStylePresets } from './text';
import { flagStylePresets } from './flag';
import { accordionStylePresets } from './accordion';
import { feedbackStylePresets } from './feedback';
import { buttonStylePresets } from './buttons';

export const stylePresets = {
  ...articleListStylePresets,
  ...breadcrumbStylePresets,
  ...buttonStylePresets,
  ...colorStylePresets,
  ...mastheadStylePresets,
  ...pageStylePresets,
  ...textStylePresets,
  ...menuStylePresets,
  ...navStylePresets,
  ...secondaryNavigationStylePresets,
  ...leadStoryStylePresets,
  ...sliceStylePresets,
  ...flagStylePresets,
  ...accordionStylePresets,
  ...feedbackStylePresets
};
