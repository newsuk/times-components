import { StylePreset } from 'newskit';

export const stylePresets: Record<string, StylePreset> = {};

stylePresets.puzzlesShadowBtn = {
  base: {
    borderWidth: '{{borders.borderWidth030}}',
    borderStyle: 'solid',
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    boxShadow: '{{shadows.shadow020}}'
  }
};
