import { StylePreset } from 'newskit';

export const stylePresets: Record<string, StylePreset> = {};

stylePresets.puzzlesShadowBtn = {
  base: {
    borderWidth: '{{borders.borderWidth030}}',
    borderStyle: 'solid',
    borderColor: '{{colors.interface060}}',
    backgroundColor: '{{colors.interface010}}',
    boxShadow: '{{shadows.shadow020}}',
    color: '{{colors.inkContrast}}'
  }
};

stylePresets.puzzlesCenterAlignedText = {
  base: {
    textAlign: 'center'
  }
};
