import { colorStylePresets } from './color';
import { mastheadStylePresets } from './masthead';
import { pageStylePresets } from './page';
import { textStylePresets } from './text';

export const stylePresets = {
  ...colorStylePresets,
  ...mastheadStylePresets,
  ...pageStylePresets,
  
  ...textStylePresets
};
