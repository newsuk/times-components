import React, { FC } from 'react';
import { Button, TextBlock } from 'newskit';

interface HintButtonProps {
  onClick: () => void;
  disabled: boolean;
  title?: string;
}

export const HintButton: FC<HintButtonProps> = ({
  onClick,
  disabled,
  title
}) => {
  return (
    <Button
      size="medium"
      onClick={onClick}
      overrides={{
        stylePreset: `buttonOutlinedSecondary`,
        typographyPreset: 'utilityButton020',
        minWidth: {
          xs: '120px',
          lg: '196px'
        },
        height: '48px'
      }}
      disabled={disabled}
    >
      <TextBlock
        stylePreset="interactiveLink030"
        typographyPreset="utilityButton020"
      >
        {title ? title : 'Give me a hint'}
      </TextBlock>
    </Button>
  );
};
