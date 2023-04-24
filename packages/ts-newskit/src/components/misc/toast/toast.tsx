import React from 'react';
import { Toast as NewskitToast } from 'newskit';

export const Toast = () => {
  return (
    <NewskitToast overrides={{ stylePreset: 'toastNegative' }}>
      Toast message will display here
    </NewskitToast>
  );
};
