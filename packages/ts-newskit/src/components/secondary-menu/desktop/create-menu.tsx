import React, { Fragment } from 'react';
import { MenuSub, Menu } from 'newskit';
import { MenuContainer } from '../styles';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { CreateMoreMenu } from './create-more-menu';
import { getBreakpoint } from '../../utils/getBreakPoint';

export const CreateMenu: React.FC<{
  options: SecondaryMenuOptions;
  data: SecondaryMenuItem[];
}> = ({ options, data }) => {
  const { isExpanded, setIsExpanded } = options;

  const { moreMenuLength } = getBreakpoint(data);

  return moreMenuLength > 0 ? (
    <Fragment>
      <NavItems data={data} options={options} />
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
            <CreateMoreMenu data={data} options={options} />
          </Menu>
        </MenuContainer>
      </MenuSub>
    </Fragment>
  ) : (
    <NavItems data={data} options={options} />
  );
};
