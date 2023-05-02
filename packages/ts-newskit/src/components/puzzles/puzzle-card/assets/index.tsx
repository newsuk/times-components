import React from 'react';
import { customToNewsKitIcon } from 'newskit';
import PuzzlePlaceholder from './PuzzlePlaceholder';

export const NewsKitPuzzlePlaceholder = customToNewsKitIcon(
  'NewsKitPuzzlePlaceholder',
  props => <PuzzlePlaceholder {...props} />
);
