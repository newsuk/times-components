import React from 'react';

import { Overlay, Bubble, Loader } from './styles';

export const LoadingOverlay = () => {
  return (
    <Overlay>
      <Loader>
        <Bubble />
        <Bubble />
        <Bubble />
      </Loader>
    </Overlay>
  );
};
