import React from 'react';
import { customToNewsKitIcon } from 'newskit';
import ChevronRightIcon from './ChevronRightIcon';
import TooltipIcon from './TooltipIcon';
import ThumbsUpIcon from './ThumbsUp';
import ThumbsDownIcon from './ThumbsDown';
import CloseIcon from './CloseIcon';

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

export { default as CloseIconBlack } from '../assets/CloseIconBlack';
export { default as EmailIcon } from '../assets/EmailIcon';
export { default as FilledArrowIcon } from './FilledArrowIcon';
export { default as BreadcrumbIcon } from './BreadcrumbIcon';
