import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { TagAndFlag } from '../tag-and-flag';

describe('TagAndFlag', () => {
  it('should render with custom marginBlockStart', () => {
    const customMargin = '0px';
    render(
      <TagAndFlag
        flag="flag"
        tag={{ label: 'Tag', href: '/' }}
        marginBlockStart={customMargin}
      />
    );
    const tagAndFlag = screen.getByTestId('tag-and-flag');
    expect(tagAndFlag).toHaveStyle(`margin-block-start: ${customMargin}`);
  });
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <TagAndFlag
        flag="flag"
        tag={{ label: 'Tag', href: '/' }}
        marginBlockStart="16px"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render 0 margin when marginBlockStart not provided', () => {
    render(
      <TagAndFlag
        flag="flag"
        tag={{ label: 'Tag', href: '/' }}
        marginBlockStart=""
      />
    );
    const tagAndFlag = screen.getByTestId('tag-and-flag');
    expect(tagAndFlag.style.marginTop).toBe('');
  });
});
