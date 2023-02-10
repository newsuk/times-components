import React from 'react';
import { ThemeProvider, Menu, MenuItem } from 'newskit';

import { TimesWebLightTheme } from '../../theme';

import { MenuWrapper } from './styles';

export const TopNav: React.FC<{}> = () => {  
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MenuWrapper>
        <Menu aria-label="Main Navigation" overrides={{
            spaceInline: "space000",
          }}>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Home</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>News</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Comment</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Life&nbsp;&amp;&nbsp;Style</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Arts&nbsp;&amp;&nbsp;Books</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Business&nbsp;&amp;&nbsp;Money</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Sport</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Magazine</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "menuItemL1"
          }}>Puzzles</MenuItem>
          {/* <MenuSub
            title="Menu item 7"
            selected={moreExpanded}
            expanded={moreExpanded}
            onClick={() => {
              setMoreExpanded(!moreExpanded);
            }}
            overrides={{
              paddingInlineStart: '16px',
              stylePreset: "menuItemL1",
              typographyPreset: "utilityLabel020"
            }}
          >
          </MenuSub> */}
        </Menu>
      </MenuWrapper>
    </ThemeProvider>
  );
};
