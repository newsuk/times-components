import React from 'react';
import { customToNewsKitIcon, styled } from 'newskit';
import ChevronRightIcon from './ChevronRightIcon';
import TooltipIcon from './TooltipIcon';
import FilledArrowIcon from './FilledArrowIcon';
import ThumbsUpIcon from './ThumbsUp';
import ThumbsDownIcon from './ThumbsDown';
import CloseIcon from './CloseIcon';

const FilledArrowIconDown = styled(FilledArrowIcon)`
  transform: rotate(180deg);
`;

export const NewsKitFilledArrowIconDown = customToNewsKitIcon(
  'NewsKitFilledArrowIconDown',
  props => <FilledArrowIconDown {...props} />
);

export const NewsKitFilledArrowIcon = customToNewsKitIcon(
  'NewsKitFilledArrowIcon',
  props => <FilledArrowIcon {...props} />
);

export const NewsKitThumbsUpIcon = customToNewsKitIcon(
  'NewsKitThumbsUpIcon',
  props => <ThumbsUpIcon {...props} />
);

export const NewsKitThumbsDownIcon = customToNewsKitIcon(
  'NewsKitThumbsDownIcon',
  props => <ThumbsDownIcon {...props} />
);

export const NewsKitCloseIcon = customToNewsKitIcon(
  'NewsKitCloseIcon',
  props => <CloseIcon {...props} />
);

export const NewsKitChevronRightIcon = customToNewsKitIcon(
  'NewsKitChevronRightIcon',
  props => <ChevronRightIcon {...props} />
);

export const NewsKitTooltipIcon = customToNewsKitIcon(
  'NewsKitTooltipIcon',
  props => <TooltipIcon {...props} />
);
