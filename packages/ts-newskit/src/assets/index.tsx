import React from 'react';
import { customToNewsKitIcon, styled } from 'newskit';
import SearchIcon from './SearchIcon';
import BurgerIcon from './BurgerIcon';
import RoundedPlusIcon from './RoundedPlusIcon';
import CloseIcon from './CloseIcon';
import ChevronIcon from './ChevronIcon';
import TimesMasthead from './TimesMasthead';
import SundayTimesMasthead from './SundayTimesMasthead';
import ChevronRigthIcon from './ChevronRightIcon';

const RoundedCloseIcon = styled(RoundedPlusIcon)`
  transform: rotate(45deg);
`;

export const NewsKitSearchIcon = customToNewsKitIcon(
  'NewskitSearchIcon',
  props => <SearchIcon {...props} />
);

export const NewsKitBurgerIcon = customToNewsKitIcon('NewsKitBurger', props => (
  <BurgerIcon {...props} />
));

export const NewsKitRoundedCloseIcon = customToNewsKitIcon(
  'NewsKitRoundedCloseIcon',
  props => <RoundedCloseIcon {...props} />
);

export const NewsKitCloseIcon = customToNewsKitIcon(
  'NewsKitCloseIcon',
  props => <CloseIcon {...props} />
);

export const NewsKitChevronIcon = customToNewsKitIcon(
  'NewsKitChevronIcon',
  props => <ChevronIcon {...props} />
);

export const NewsKitTimesMasthead = customToNewsKitIcon(
  'NewskitTimesMasthead',
  props => <TimesMasthead {...props} />
);

export const NewsKitSundayTimesMasthead = customToNewsKitIcon(
  'NewskitSundayTimesMasthead',
  props => <SundayTimesMasthead {...props} />
);

export const NewsKitChevronRightIcon = customToNewsKitIcon(
  'NewsKitChevronRightIcon',
  props => <ChevronRigthIcon {...props} />
);
