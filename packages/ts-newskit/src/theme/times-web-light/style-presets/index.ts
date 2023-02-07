import { colorStylePresets } from './color';
import { menuStylePresets } from './menu';
import { navigationStylePresets } from './navigation';
import { pageStylePresets } from './page';
import { textStylePresets } from './text';

export const stylePresets = {
  ...colorStylePresets,
  ...navigationStylePresets,
  ...pageStylePresets,
  ...textStylePresets,
  ...menuStylePresets
};
