import React from 'react';
import { Tooltip, IconButton } from 'newskit';
import { NewsKitTooltipIcon } from '../../../assets';


export const JobTitleTooltip: React.FC<{contractualTitle: string}> = ({contractualTitle}) => (
<Tooltip
  content={contractualTitle}
  asLabel
  placement="top-end"
  trigger={['focus', 'hover']}
  overrides={{
    offset: 'space000'
  }}
>
    <IconButton overrides={{stylePreset: 'iconButtonMinimalSecondary', marginInlineStart: 'space020'}}>
    <NewsKitTooltipIcon />
  </IconButton>
</Tooltip>
);