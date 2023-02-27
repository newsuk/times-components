import React, { Fragment } from 'react';
import { MenuSub, MenuItem, MenuDivider } from 'newskit';
import { MenuItemParent } from '../types';

const NavigationList: React.FC<{
  data: MenuItemParent[];
  expandedL1?: string;
  onExpand?: (slug: string) => void;
}> = ({ data, expandedL1, onExpand }) => {
  return (
    <>
      {data.map(
        item =>
          item.items && onExpand ? (
            <Fragment key={item.slug}>
              <MenuSub
                title={item.title}
                id={`vertical-${item.slug}`}
                expanded={expandedL1 === item.slug}
                onClick={() =>
                  expandedL1 !== item.slug ? onExpand(item.slug) : onExpand('')
                }
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset040'
                }}
              >
                {item.items.map(i => (
                  <Fragment key={`sub-${i.slug}`}>
                    <MenuItem
                      key={item.slug}
                      href={i.url}
                      id={`vertical-sub-${i.slug}`}
                      overrides={{
                        stylePreset: 'menuItemL2',
                        typographyPreset: 'newPreset040'
                      }}
                    >
                      {i.title}
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
