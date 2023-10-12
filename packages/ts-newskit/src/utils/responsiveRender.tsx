import React, { ReactNode } from 'react';
import { render } from './test-utils';
import { BreakpointKeys } from 'newskit';

export const renderComponent = (
  children: ReactNode,
  breakpoint?: BreakpointKeys
) => {
  const getMaxWidth = () => {
    switch (breakpoint) {
      case 'xs':
        return '320px';
      case 'sm':
        return '520px';
      case 'md':
        return '768px';
      case 'lg':
        return '1024px';
      case 'xl':
        return '1440px';
      default:
        return '768px';
    }
  };
  return render(<div style={{ maxWidth: getMaxWidth() }}>{children}</div>);
};
