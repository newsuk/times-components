import { colorStylePresets } from './color';
import { menuStylePresets } from './menu';
import { pageStylePresets } from './page';
import { textStylePresets } from './text';

export const stylePresets = {
  ...colorStylePresets,
  ...pageStylePresets,
  ...textStylePresets,
  ...menuStylePresets
};
