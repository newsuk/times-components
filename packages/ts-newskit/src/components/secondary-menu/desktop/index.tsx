import React, { Fragment } from 'react';
import { MenuDivider } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { CreateMenu } from './create-menu';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const SecondaryNavDesktop: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { breakpointKey } = getBreakpoint(data);

  return (
    <Fragment>
      <CreateMenu data={data} options={options} />
      <MenuDivider role="hr" breakpointKey={breakpointKey} />
    </Fragment>
  );
};
