import React from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { mainMenuItems } from './fixtures/menu-items.json';
import { Visible } from 'newskit';
import { SecondaryMenuItem } from './types';

export const SecondaryNav: React.FC<{
  title: string;
  isActive: boolean;
  data: SecondaryMenuItem[];
}> = ({ title }) => {
  return (
    <>
      <Visible sm xs>
        <SecondaryNavMobile
          data={mainMenuItems}
          title={title}
          isActive={false}
        />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop data={mainMenuItems} />
      </Visible>
    </>
  );
};
