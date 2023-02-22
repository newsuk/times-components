import React, { Fragment } from 'react';
import { MenuSub, Menu } from 'newskit';
import { MenuContainer } from '../styles';
import { SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';
import { useBreakpoint } from '../../utils/test';

export const CreateMenu: React.FC<{
  data: SecondaryMenuItem[];
  isSelected: string;
  handleSelect: (value: string) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}> = ({
  data,
  handleSelect,
  isSelected,
  isExpanded = false,
  setIsExpanded
}) => {
  const { moreMenuLength } = useBreakpoint(data);

  return moreMenuLength > 0 ? (
    <Fragment>
      <NavItems
        data={data}
        isSelected={isSelected}
        handleSelect={handleSelect}
      />
      <MenuSub
        onClick={() => setIsExpanded(!isExpanded)}
        expanded={isExpanded}
        title="See all"
        overrides={{
          stylePreset: `${isExpanded ? 'subMenuPreset2' : 'subMenuPreset1'}`,
          list: { stylePreset: 'subMenuItems' },
          typographyPreset: 'newPreset040'
        }}
        data-testid="more-sub-menu"
      >
        <MenuContainer>
          <Menu
            vertical
            overrides={{
              spaceInline: 'sizing000'
            }}
            aria-label="menu-multiple-auto"
          >
            <CreateMoreMenu
              data={data}
              isSelected={isSelected}
              handleSelect={handleSelect}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </Menu>
        </MenuContainer>
      </MenuSub>
    </Fragment>
  ) : (
    <NavItems data={data} isSelected={isSelected} handleSelect={handleSelect} />
  );
};
