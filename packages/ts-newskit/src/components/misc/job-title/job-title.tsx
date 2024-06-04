import React from 'react';
import { NewsKitTooltipIcon } from '../../../assets';
import {
  CloseButton,
  IconButton,
  Popover,
  PopoverContext,
  PopoverHeader,
  Tooltip,
  TooltipContext
} from './styles';
import CloseIcon from './assets/close-icon';

export const JobTitleTooltip: React.FC<{ contractualTitle: string }> = ({
  contractualTitle
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  return (
    <>
      <Tooltip>
        <TooltipContext data-testid="Tooltip-context" isOpen={tooltipOpen}>
          {contractualTitle}
        </TooltipContext>
        <IconButton
          aria-label="See contractual title, button"
          data-testid="Tooltip"
          onMouseOver={() => setTooltipOpen(true)}
          onMouseOut={() => setTooltipOpen(false)}
        >
          <NewsKitTooltipIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const JobTitlePopover: React.FC<{ contractualTitle: string }> = ({
  contractualTitle
}) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <>
      <Popover>
        <PopoverContext data-testid="Popover-context" isOpen={popoverOpen}>
          <PopoverHeader>
            <div>{contractualTitle}</div>
            <CloseButton data-testid="close-button" onClick={togglePopover}>
              <CloseIcon />
            </CloseButton>
          </PopoverHeader>
        </PopoverContext>
        <IconButton
          aria-label="See contractual title, button"
          data-testid="Popover"
          onClick={togglePopover}
        >
          <NewsKitTooltipIcon />
        </IconButton>
      </Popover>
    </>
  );
};

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
