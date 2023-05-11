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

stylePresets.dashedDivider = {
  base: {
    borderStyle: 'dashed none none none',
    borderWidth: '{{borders.borderWidth010}}',
    borderColor: '{{colors.interface060}}'
  }
};
stylePresets.flagProgress = {
  base: {
    backgroundColor: '{{colors.interfaceInformative010}}',
    color: '{{colors.inkInverse}}',
    borderRadius: '{{borders.borderWidth020}}',
    textTransform: 'uppercase'
  }
};

stylePresets.flagComplete = {
  base: {
    backgroundColor: '{{colors.interfacePositive010}}',
    color: '{{colors.inkInverse}}',
    borderRadius: '{{borders.borderWidth020}}',
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

stylePresets.puzzleCardLink = {
  base: {
    color: '{{colors.inkContrast}}'
  }
};

stylePresets.puzzleCardMedia = {
  base: {
    borderRadius:
      '{{borders.borderRadiusRounded010}} {{borders.borderRadiusRounded010}} 0 0'
  }
};

stylePresets.accordionHeader = {
  base: {
    color: '{{colors.inkBrand010}}',
    borderStyle: 'none none dashed none',
    iconColor: '{{colors.inkSubtle}}'
  },
  hover: {
    backgroundColor: 'none',
    color: '{{colors.inkBrand010}}',
    iconColor: '{{colors.inkSubtle}}'
  }
};

stylePresets.accordionPanel = {
  base: {
    borderStyle: 'none none dashed none'
  }
};

stylePresets.accordionHeaderPrimary = {
  base: {
    color: '{{colors.inkBase}}',
    backgroundColor: '{{colors.white}}',
    borderWidth: '{{borders.borderWidth010}}',
    borderStyle: 'none none solid none',
    borderColor: '{{colors.neutral050}}'
  }
};

stylePresets.accordionPanelPrimary = {
  base: {
    color: '{{colors.inkSubtle}}',
    borderWidth: '{{borders.borderWidth010}}',
    borderStyle: 'none none solid none',
    borderColor: '{{colors.neutral050}}'
  }
};

stylePresets.freeTrailShadowBtn = {
  base: {
    borderStyle: 'solid',
    borderColor: '{{colors.interface060}}',
    borderRadius: '{{borders.borderRadiusDefault}}',
    borderWidth: '{{borders.borderWidth030}}',
    boxShadow: '{{shadows.shadow020}}',
    backgroundColor: '{{colors.interface010}}',
    color: '{{colors.inkContrast}}'
  }
};
