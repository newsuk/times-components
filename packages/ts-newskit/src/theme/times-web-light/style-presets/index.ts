import { colorStylePresets } from './color';
import { menuStylePresets } from './menu';
import { pageStylePresets } from './page';
import { secondaryNavigationStylePresets } from './secondary-nav';
import { textStylePresets } from './text';

export const stylePresets = {
  ...colorStylePresets,
  ...pageStylePresets,
  ...textStylePresets,
  ...menuStylePresets,
  ...secondaryNavigationStylePresets
};
