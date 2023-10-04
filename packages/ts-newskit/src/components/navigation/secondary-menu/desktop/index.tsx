import React, { Fragment } from 'react';
import { MenuDivider } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { CreateMenu } from './create-menu';

export const SecondaryNavDesktop: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  return (
    <Fragment>
      <CreateMenu data={data} options={options} clickHandler={clickHandler} />
      <MenuDivider />
    </Fragment>
  );
};
