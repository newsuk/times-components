import React from 'react';
import { Popover, IconButton, Tooltip } from 'newskit';
import { NewsKitTooltipIcon } from '../../../assets';

export const JobTitleTooltip: React.FC<{ contractualTitle: string }> = ({
  contractualTitle
}) => (
  <Tooltip
    aria-live="polite"
    content={contractualTitle}
    placement="top-start"
    trigger={['focus', 'hover']}
    overrides={{
      offset: 'space000',
      panel: {
        typographyPreset: 'utilityLabel010'
      }
    }}
    data-testid="Tooltip"
  >
    <IconButton
      aria-label="See contractual title, button"
      data-testid="Tooltip"
      overrides={{
        stylePreset: 'iconButtonMinimalSecondary',
        marginInlineStart: 'space020'
      }}
    >
      <NewsKitTooltipIcon />
    </IconButton>
  </Tooltip>
);

export const JobTitlePopover: React.FC<{ contractualTitle: string }> = ({
  contractualTitle
}) => (
  <Popover
    content={<>{null}</>}
    header={contractualTitle}
    placement="top-start"
    overrides={{
      closeButtonContainer: {
        stylePreset: 'popover'
      },
      offset: 'space000',
      content: {
        paddingBlock: 'space000',
        paddingInline: 'space000'
      },
      header: {
        typographyPreset: 'utilityLabel010',
        stylePreset: 'popover'
      }
    }}
  >
    <IconButton
      aria-label="See contractual title, button"
      data-testid="Popover"
      overrides={{
        stylePreset: 'iconButtonMinimalSecondary',
        marginInlineStart: 'space020'
      }}
    >
      <NewsKitTooltipIcon />
    </IconButton>
  </Popover>
);

export const JobTitle: React.FC<{
  contractualTitle: string;
  isLargeDevice: boolean;
}> = ({ contractualTitle, isLargeDevice }) => {
  return isLargeDevice ? (
    <JobTitleTooltip
      contractualTitle={contractualTitle}
      data-testid="Tooltip"
    />
  ) : (
    <JobTitlePopover
      contractualTitle={contractualTitle}
      data-testid="Popover"
    />
  );
};
