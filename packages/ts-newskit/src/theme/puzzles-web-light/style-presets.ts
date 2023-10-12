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

stylePresets.freeTrialShadowBtn = {
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

stylePresets.HintBtn = {
  base: {
    color: '{{colors.interactiveLink030}}',
    borderRadius: '{{borders.borderRadiusRounded010}}',
    borderStyle: 'solid',
    borderWidth: '{{borders.borderWidthDefault}}',
    borderColor: '{{colors.interactiveLink020}}',
    backgroundColor: '{{colors.transparent}}'
  },
  disabled: {
    borderRadius: '{{borders.borderRadiusRounded010}}',
    color: '{{colors.neutral060}}',
    borderStyle: 'solid',
    borderWidth: '{{borders.borderWidthDefault}}',
    borderColor: '{{colors.neutral020}}',
    backgroundColor: '{{colors.neutral020}}'
  }
};

stylePresets.HowToPlay = {
  base: {
    color: '{{colors.interactiveLink030}}',
    borderRadius: '{{borders.borderRadiusDefault}}',
    borderStyle: 'solid',
    borderWidth: '{{borders.borderWidth000}}',
    backgroundColor: '{{colors.transparent}}'
  }
};

stylePresets.modalHeaderCustom = {
  base: {
    borderStyle: 'none none solid none',
    borderWidth: '{{borders.borderWidth010}}',
    borderColor: '{{colors.interface040}}',
    color: '{{colors.inkBase}}'
  }
};
stylePresets.overlayCustom = {
  base: {
    backgroundColor: '{{overlays.overlayTintBase020}}'
  }
};

stylePresets.contactuslink = {
  base: {
    textDecoration: 'none',
    borderWidth: '{{borders.borderWidth010}}',
    borderStyle: 'solid',
    borderColor: '{{colors.interface040}}'
  }
};
