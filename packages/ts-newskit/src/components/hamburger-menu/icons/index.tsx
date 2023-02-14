import React from 'react';
import { customToNewsKitIcon } from 'newskit';
import SearchIcon from '../assets/SearchIcon';

export const NewsKitSearchIcon = customToNewsKitIcon(
  'NewsKitSearchIcon',
  props => <SearchIcon {...props} />
);
