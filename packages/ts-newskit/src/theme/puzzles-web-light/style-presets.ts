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

stylePresets.flagProgress = {
  base: {
    backgroundColor: '{{colors.interfaceInformative010}}',
    color: '{{colors.inkInverse}}',
    borderRadius: '2px',
    textTransform: 'uppercase'
  }
};

stylePresets.flagComplete = {
  base: {
    backgroundColor: '{{colors.interfacePositive010}}',
    color: '{{colors.inkInverse}}',
    borderRadius: '2px',
    textTransform: 'uppercase'
  }
};

stylePresets.puzzleCard = {
  base: {
    borderWidth: '{{borders.borderWidth010}}',
    borderStyle: 'solid',
    borderColor: '{{colors.interface040}}',
    borderRadius: '{{borders.borderRadiusRounded010}}',
    textAlign: 'center'
  }
};
