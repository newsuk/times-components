import React from 'react';
import { MenuSub, MenuItem, MenuDivider } from 'newskit';

const NavItems = ({ data, expandedL1, onExpand }) => {

  const L1Overrides = {
    stylePreset: 'menuItemL1',
  };
  const L2Overrides = {
    stylePreset: 'menuItemL2'
  };
  
  return (
    data.map(item => (
      item.items ? (
        <>
          <MenuSub
            title={item.title}
            id={`vertical-${item.slug}`}
            expanded={expandedL1 === item.slug}
            onClick={() => expandedL1 !== item.slug ? onExpand(item.slug): onExpand('')}
            overrides={{...L1Overrides}}
          >
            {item.items.map(i => (
              <>
                <MenuItem href={i.url} id={`vertical-${i.slug}`} overrides={{...L2Overrides}}>
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
          <MenuItem href={item.url} id={`vertical-${item.slug}`} overrides={{...L1Overrides}}>
            {item.title}
          </MenuItem>
          <MenuDivider />
        </>
      )
    ))
  );
};

export default NavItems;