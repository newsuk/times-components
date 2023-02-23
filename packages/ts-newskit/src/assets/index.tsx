import React from 'react';
import { customToNewsKitIcon } from 'newskit';
import SearchIcon from '../assets/SearchIcon';
import BurgerIcon from '../assets/BurgerIcon';
import Masthead from './Masthead';
import RoundedCloseIcon from './RoundedCloseIcon';
import CloseIcon from '../assets/CloseIcon';
import ChevronIcon from './ChevronIcon';

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
