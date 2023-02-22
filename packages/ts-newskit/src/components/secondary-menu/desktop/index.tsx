import React, { Fragment } from 'react';
import { MenuDivider, MainMenu } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';

import { CreateMenu } from './create-menu';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const SecondaryNavDesktop: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { moreMenuLength } = getBreakpoint(data);

  return (
    <Fragment>
      <MainMenu
        hasMoreItems={moreMenuLength > 0 ? true : false}
        aria-label="Secondary Navigation"
        overrides={{
          spaceInline: 'space050'
        }}
      >
        <CreateMenu data={data} options={options} />
      </MainMenu>
      <MenuDivider />
    </Fragment>
  );
};
