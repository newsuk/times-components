import React from 'react';
import { Popover, IconButton } from 'newskit';
import { NewsKitTooltipIcon } from '../../../assets';


export const JobTitlePopover: React.FC<{contractualTitle: string}> = ({ contractualTitle }) => (
<Popover
  content={contractualTitle}
  header={contractualTitle}
  placement='top-start'
  overrides={{
    offset: 'space000',
    panel: {
      stylePreset: 'popover'
    },
    header: {
      typographyPreset: 'utilityLabel010'
    }
    
  }}
>
    <IconButton overrides={{stylePreset: 'iconButtonMinimalSecondary', marginInlineStart: 'space020'}}>
    <NewsKitTooltipIcon />
  </IconButton>
</Popover>
);