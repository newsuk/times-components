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
