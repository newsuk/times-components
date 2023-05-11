import React from 'react';
import { JobTitlePopover } from './job-title-popover';
import { JobTitleTooltip } from './job-title-tooltip';
import { useBreakpointKey } from 'newskit';

export const JobTitle: React.FC<{contractualTitle: string}> = ({ contractualTitle }) => {
  const breakpointKey = useBreakpointKey();
  const isLargeDevice = breakpointKey === 'lg' || breakpointKey === 'xl';
  return (
    <>
      {isLargeDevice ? (
        <JobTitleTooltip contractualTitle={contractualTitle} />
      ) : (
        <JobTitlePopover contractualTitle={contractualTitle} />
      )
      }
    </>
  )
}