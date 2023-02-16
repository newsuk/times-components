import React from 'react';
import { MenuSub, MenuItem, MenuDivider } from 'newskit';
import { MenuItemParent } from './types';

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
            <>
              <MenuSub
                title={item.title}
                id={`vertical-${item.slug}`}
                expanded={expandedL1 === item.slug}
                onClick={() =>
                  expandedL1 !== item.slug ? onExpand(item.slug) : onExpand('')
                }
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset020',
                  indicatorIcon: {
                    props: {
                      overrides: {
                        stylePreset: `${
                          expandedL1 !== item.slug
                            ? 'IconPreset1'
                            : 'IconPreset2'
                        }`
                      }
                    }
                  }
                }}
              >
                {item.items.map(i => (
                  <>
                    <MenuItem
                      key={item.slug}
                      href={i.url}
                      id={`vertical-${i.slug}`}
                      overrides={{
                        stylePreset: 'menuItemL2',
                        typographyPreset: 'newPreset020'
                      }}
                    >
                      {i.title}
                    </MenuItem>
                    <MenuDivider />
                  </>
                ))}
              </MenuSub>
              <MenuDivider />
            </>
          ) : (
            <>
              <MenuItem
                key={item.slug}
                href={item.url}
                id={`vertical-${item.slug}`}
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset020'
                }}
              >
                {item.title}
              </MenuItem>
              <MenuDivider />
            </>
          )
      )}
    </>
  );
};

export default NavigationList;
