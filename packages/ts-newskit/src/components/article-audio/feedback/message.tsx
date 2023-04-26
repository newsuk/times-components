import React from 'react';
import { Stack, TextBlock, IconButton } from 'newskit';
import { NewsKitCloseIcon } from '../../../assets';

export const Message: React.FC<{
  closed: boolean;
  setClosed: (value: boolean) => void;
  message: string;
}> = ({ closed, setClosed, message }) => {
  return (
    <Stack
      stackDistribution="space-between"
      flow="horizontal-top"
      spaceInline="space050"
    >
      <TextBlock typographyPreset="utilityBody020">{message}</TextBlock>
      <IconButton
        overrides={{
          stylePreset: 'feedbackIconButtonOutlineSecondary',
          iconSize: 'iconSize080'
        }}
        onClick={() => setClosed(!closed)}
        aria-label="Thank you Close"
      >
        <NewsKitCloseIcon />
      </IconButton>
    </Stack>
  );
};
