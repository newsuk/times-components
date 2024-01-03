import React, { Fragment } from 'react';
import { MenuDivider } from 'newskit';
import { MenuItemParent } from '../types';
import { StyledL2MenuItem, StyledMenuItem, StyledMenuSub } from '../styles';

const NavigationList: React.FC<{
  data: MenuItemParent[];
  expandedL1?: string;
  onExpand?: (slug: string) => void;
  clickHandler: (title: string) => void;
}> = ({ data, expandedL1, onExpand, clickHandler }) => {
  const handleItemClick = (slug: string, title: string) => {
    if (onExpand) {
      expandedL1 !== slug ? onExpand(slug) : onExpand('');
    }
    clickHandler(title);
  };
  return (
    <>
      {data.map(
        item =>
          item.items ? (
            <Fragment key={item.slug}>
              <StyledMenuSub
                title={item.title}
                id={`vertical-${item.slug}`}
                expanded={expandedL1 === item.slug}
                onClick={() => handleItemClick(item.slug, item.title)}
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset040'
                }}
              >
                {item.items.map(({ slug, title, url }) => (
                  <Fragment key={`sub-${slug}`}>
                    <StyledL2MenuItem
                      key={item.slug}
                      id={`vertical-sub-${slug}`}
                      href={url}
                      onClick={() => clickHandler(title)}
                    >
                      {title}
                    </StyledL2MenuItem>
                    <MenuDivider />
                  </Fragment>
                ))}
              </StyledMenuSub>
              <MenuDivider />
            </Fragment>
          ) : (
            <Fragment key={item.slug}>
              <StyledMenuItem
                key={item.slug}
                href={item.url}
                id={`vertical-${item.slug}`}
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset040'
                }}
                onClick={() => clickHandler(item.title)}
              >
                {item.title}
              </StyledMenuItem>
              <MenuDivider />
            </Fragment>
          )
      )}
    </>
  );
};

export default NavigationList;
