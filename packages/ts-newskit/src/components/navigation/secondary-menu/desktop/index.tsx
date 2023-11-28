import React, { Fragment } from 'react';
import { MenuDivider } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuData } from '../types';
import { CreateMenu } from './create-menu';

export const SecondaryNavDesktop: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuData;
  clickHandler: (title: string) => void;
}> = ({ options, data, clickHandler }) => {
  return (
    <Fragment>
      <CreateMenu
        data={data.L2NavItems}
        options={options}
        clickHandler={clickHandler}
      />
      <MenuDivider />
      {data.L3NavItems ? (
        <>
          <CreateMenu
            data={data.L3NavItems}
            options={options}
            clickHandler={clickHandler}
          />
          <MenuDivider />
        </>
      ) : null}
    </Fragment>
  );
};
