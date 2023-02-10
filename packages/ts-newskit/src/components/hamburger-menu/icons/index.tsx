import React from 'react';
import { customToNewsKitIcon } from "newskit";
import SearchIcon from '../assets/SearchIcon';
import BurgerIcon from '../assets/BurgerIcon';
import Masthead from '../assets/Masthead';
import CloseIcon from '../assets/CloseIcon';

export const NewsKitSearchIcon = customToNewsKitIcon(
  'NewsKitSearchIcon',
  props => <SearchIcon {...props} />,
);

export const NewsKitBurger = customToNewsKitIcon(
'NewsKitBurger',
props => <BurgerIcon {...props}/>
);

export const NewsKitMasthead = customToNewsKitIcon(
'NewsKitMasthead',
props => <Masthead {...props} />
);

export const NewsKitCloseIcon = customToNewsKitIcon(
'NewsKitCloseIcon',
props => <CloseIcon {...props} />
);
