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
      spaceInline="space030"
    >
      <TextBlock typographyPreset="utilityBody020" marginInline="space000">
        {message}
      </TextBlock>
      <IconButton
        overrides={{
          stylePreset: 'iconButtonMinimalSecondary',
          iconSize: 'iconSize080',
          marginInline: 'space000'
        }}
        onClick={() => setClosed(!closed)}
        aria-label="close"
      >
        <NewsKitCloseIcon />
      </IconButton>
    </Stack>
  );
};
