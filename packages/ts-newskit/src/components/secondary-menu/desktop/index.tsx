import React, { Fragment } from 'react';
import { MenuDivider, MainMenu } from '../styles';
import { SecondaryMenuItem } from '../types';

import { CreateMenu } from './create-menu';
import { useBreakpoint } from '../../utils/test';

export const SecondaryNavDesktop: React.FC<{
  data: SecondaryMenuItem[];
  isSelected: string;
  handleSelect: (value: string) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}> = ({ data, handleSelect, isSelected, isExpanded, setIsExpanded }) => {
  const { moreMenuLength } = useBreakpoint(data);

  return (
    <Fragment>
      <MainMenu
        hasMoreItems={moreMenuLength > 0 ? true : false}
        aria-label="Secondary Navigation"
        overrides={{
          spaceInline: 'space050'
        }}
      >
        <CreateMenu
          data={data}
          isSelected={isSelected}
          handleSelect={handleSelect}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </MainMenu>
      <MenuDivider />
    </Fragment>
  );
};
