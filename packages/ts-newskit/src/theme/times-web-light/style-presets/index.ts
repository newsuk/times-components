import { breadcrumbStylePresets } from './breadcrumb';
import { colorStylePresets } from './color';
import { mastheadStylePresets } from './masthead';
import { menuStylePresets } from './menu';
import { navStylePresets } from './navigation';
import { pageStylePresets } from './page';
import { sectionheaderStylePresets } from './sectionheader';
import { secondaryNavigationStylePresets } from './secondary-nav';
import { textStylePresets } from './text';

export const stylePresets = {
  ...breadcrumbStylePresets,
  ...colorStylePresets,
  ...mastheadStylePresets,
  ...pageStylePresets,
  ...sectionheaderStylePresets,
  ...textStylePresets,
  ...menuStylePresets,
  ...navStylePresets,
  ...secondaryNavigationStylePresets
};
