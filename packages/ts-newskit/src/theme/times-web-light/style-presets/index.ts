import { breadcrumbStylePresets } from './breadcrumb';
import { colorStylePresets } from './color';
import { mastheadStylePresets } from './masthead';
import { menuStylePresets } from './menu';
import { navStylePresets } from './navigation';
import { pageStylePresets } from './page';
import { secondaryNavigationStylePresets } from './secondary-nav';
import { sliceStylePresets } from './slices';
import { textStylePresets } from './text';
import { feedbackStylePresets } from './feedback';
import { buttonStylePresets } from './buttons';
import { sliceHeaderStylePresets } from './slice-header';

export const stylePresets = {
  ...breadcrumbStylePresets,
  ...buttonStylePresets,
  ...colorStylePresets,
  ...mastheadStylePresets,
  ...pageStylePresets,
  ...textStylePresets,
  ...menuStylePresets,
  ...navStylePresets,
  ...secondaryNavigationStylePresets,
  ...sliceStylePresets,
  ...feedbackStylePresets,
  ...sliceHeaderStylePresets
};
