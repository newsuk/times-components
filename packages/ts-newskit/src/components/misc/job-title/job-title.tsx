import React from 'react';
import { useBreakpointKey, NewsKitProvider, Popover, IconButton, Tooltip } from 'newskit';
import { TimesWebLightTheme } from '../../../theme';
import { NewsKitTooltipIcon } from '../../../assets';

export const JobTitleTooltip: React.FC<{ contractualTitle: string }> = ({
  contractualTitle
}) => (
  <Tooltip
    content={contractualTitle}
    asLabel
    placement="top-end"
    trigger={['focus', 'hover']}
    overrides={{
      offset: 'space000'
    }}
  >
    <IconButton
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
      overrides={{
        stylePreset: 'iconButtonMinimalSecondary',
        marginInlineStart: 'space020'
      }}
    >
      <NewsKitTooltipIcon />
    </IconButton>
  </Popover>
);


export const JobTitle: React.FC<{ contractualTitle: string }> = ({
  contractualTitle
}) => {
  const breakpointKey = useBreakpointKey();
  const isLargeDevice = breakpointKey === 'lg' || breakpointKey === 'xl';
  return (
    <NewsKitProvider theme={TimesWebLightTheme}>
      {isLargeDevice ? (
        <JobTitleTooltip contractualTitle={contractualTitle} />
      ) : (
        <JobTitlePopover contractualTitle={contractualTitle} />
      )}
    </NewsKitProvider>
  );
};
