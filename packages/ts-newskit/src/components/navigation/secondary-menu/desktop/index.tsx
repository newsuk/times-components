// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
