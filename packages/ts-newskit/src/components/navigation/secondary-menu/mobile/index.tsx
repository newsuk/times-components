import React from 'react';
import { Menu } from 'newskit';
import { Navigator } from './navigator';
import { SecondaryMenuOptions, SecondaryMenuItem } from '../types';
import { NavItems } from './navItems';
import { NavItemMobileContainer } from '../styles';

export const SecondaryNavMobile: React.FC<{
    options: SecondaryMenuOptions;
    data: SecondaryMenuItem[];
    onClick?: (isExpanded: boolean) => void;
    withScroll: boolean;
}> = ({ options, data, onClick, withScroll }) => {
    const { isExpanded, isSelected } = options;
    const subMenuTitle = isExpanded ? 'Close' : 'See all';

    return (
        <Menu
            vertical
            aria-label="Secondary Navigation"
            overrides={{
                spaceInline: 'space000',
            }}
        >
            <Navigator
                title={isSelected}
                options={options}
                subMenuTitle={subMenuTitle}
                onClick={onClick}
            />
            {isExpanded ? (
                <NavItemMobileContainer withScroll={withScroll}>
                    <NavItems data={data} options={options} />
                </NavItemMobileContainer>               
            ) : null}
        </Menu>
    );
};
