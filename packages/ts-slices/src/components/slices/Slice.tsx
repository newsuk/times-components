import React from 'react';

// Polyfills
import 'polyfill-array-includes';
import 'intersection-observer';
import 'url-polyfill';

import { SliceData } from '../../types/slice';
import { SliceStyle } from '../../types/styles';
import { ClickHandlerType } from '../../types/event';
import { getSliceComponent } from '../../utils/getSlice';

export const Slice: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = ({ slice, styles, clickHandler }) => {
  const SliceComponent = getSliceComponent(slice.name);

  return (
    <SliceComponent slice={slice} styles={styles} clickHandler={clickHandler} />
  );
};
