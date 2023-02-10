import React from 'react';
import { MenuSub, MenuItem, MenuDivider } from 'newskit';
import { NavigationItem } from './types';

const NavItems: React.FC<{data: NavigationItem[], expandedL1?: string, onExpand?: Function}> = ({ data, expandedL1, onExpand }) => {

  const L1Overrides = {
    stylePreset: 'menuItemL1',
  };

  const L2Overrides = {
    stylePreset: 'menuItemL2',
  };
  
  return (
    <>
    {data.map(item => (
      item.items ? (
        <>
          <MenuSub
            title={item.title}
            id={`vertical-${item.slug}`}
            expanded={expandedL1 === item.slug}
            onClick={() => expandedL1 !== item.slug ? onExpand(item.slug): onExpand('')}
            overrides={{...L1Overrides, typographyPreset: 'newPreset020', indicatorIcon:  { props: {
              overrides: {
                stylePreset: `${expandedL1 !== item.slug ? 'IconPreset1' : 'IconPreset2'}`
              }
            }}}}
            
          >
            {item.items.map(i => (
              <>
                <MenuItem href={i.url} id={`vertical-${i.slug}`} overrides={{...L2Overrides, typographyPreset: 'newPreset020'}}>
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
          <MenuItem href={item.url} id={`vertical-${item.slug}`} overrides={{...L1Overrides, typographyPreset: 'newPreset020'}}>
            {item.title}
          </MenuItem>
          <MenuDivider />
        </>
      )
    ))}
    </>
  );
};

export default NavItems;