import React from 'react';
import { customToNewsKitIcon } from 'newskit';
import SearchIcon from './SearchIcon';
import BurgerIcon from './BurgerIcon';
import Masthead from './Masthead';
import RoundedCloseIcon from './RoundedCloseIcon';
import CloseIcon from './CloseIcon';
import ChevronIcon from './ChevronIcon';
import TimesMasthead from './times-logo';
import SundayTimesMasthead from './sunday-times-logo';

export const NewsKitSearchIcon = customToNewsKitIcon(
  'NewskitSearchIcon',
  props => <SearchIcon {...props} />
);

export const NewsKitBurgerIcon = customToNewsKitIcon('NewsKitBurger', props => (
  <BurgerIcon {...props} />
));

export const NewsKitMasthead = customToNewsKitIcon('NewsKitMasthead', props => (
  <Masthead {...props} />
));

export const NewsKitRoundedCloseIcon = customToNewsKitIcon(
  'RoundedCloseIcon',
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
