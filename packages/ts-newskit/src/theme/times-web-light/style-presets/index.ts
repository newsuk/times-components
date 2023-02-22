import { colorStylePresets } from './color';
import { mastheadStylePresets } from './masthead';
import { menuStylePresets } from './menu';
import { pageStylePresets } from './page';
import { sectionheaderStylePresets } from './sectionheader';
import { textStylePresets } from './text';

export const stylePresets = {
  ...colorStylePresets,
  ...mastheadStylePresets,
  ...pageStylePresets,
  ...sectionheaderStylePresets,
  ...textStylePresets,
  ...menuStylePresets
};
