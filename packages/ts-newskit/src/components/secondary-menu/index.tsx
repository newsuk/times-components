import React from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { mainMenuItems } from './fixtures/menu-items.json';

export const SecondaryNav: React.FC<{}> = () => {
  return (
    <>
      <SecondaryNavDesktop data={mainMenuItems} />
      <SecondaryNavMobile
        data={mainMenuItems}
        title={'Top Stories'}
        isActive={false}
      />
    </>
  );
};
