import React from 'react';
import { customToNewsKitIcon } from 'newskit';
import ChevronRightIcon from './ChevronRightIcon';
import TooltipIcon from './TooltipIcon';
import FilledArrowIcon from './FilledArrowIcon';
import ThumbsUpIcon from './ThumbsUp';
import ThumbsDownIcon from './ThumbsDown';
import CloseIcon from './CloseIcon';
import EmailIcon from './EmailIcon';
import CloseIconBlack from './CloseIconBlack';

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

export const NewsKitEmailIcon = customToNewsKitIcon(
  'NewsKitEmailIcon',
  props => <EmailIcon {...props} />
);

export const NewsKitCloseIconBlack = customToNewsKitIcon(
  'NewsKitCloseIconBlack',
  props => <CloseIconBlack {...props} />
);
