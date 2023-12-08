import React, { Fragment } from 'react';
import { MenuSub, MenuItem, MenuDivider } from 'newskit';
import { MenuItemParent } from '../types';

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
              <MenuSub
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
                    <MenuItem
                      key={item.slug}
                      href={url}
                      id={`vertical-sub-${slug}`}
                      overrides={{
                        paddingInlineStart: 'space060',
                        stylePreset: 'menuItemL2',
                        typographyPreset: 'newPreset040'
                      }}
                      onClick={() => clickHandler(title)}
                    >
                      {title}
                    </MenuItem>
                    <MenuDivider />
                  </Fragment>
                ))}
              </MenuSub>
              <MenuDivider />
            </Fragment>
          ) : (
            <Fragment key={item.slug}>
              <MenuItem
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
              </MenuItem>
              <MenuDivider />
            </Fragment>
          )
      )}
    </>
  );
};

export default NavigationList;
