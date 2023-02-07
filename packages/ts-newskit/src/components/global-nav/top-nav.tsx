import React, { useState } from 'react';
import { ThemeProvider, Menu, MenuItem, MenuSub, Stack, Divider } from 'newskit';

import { TimesWebLightTheme } from '../../theme';

import { TopNavContainer } from './styles';
import { NewsKitBurgerIcon, NewsKitMasthead, NewsKitSearchIcon } from '../../assets';

export const TopNav: React.FC<{}> = () => {
  const [moreExpanded, setMoreExpanded] = useState(false);

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <TopNavContainer>
      <Stack spaceInline="space010" flow="horizontal-center">
        <NewsKitBurgerIcon />
        <Divider vertical />
        <NewsKitSearchIcon />
        <Divider vertical />
        <NewsKitMasthead />
        <Menu aria-label="Main Navigation" overrides={{
            spaceInline: "space000"
          }}>
          <Divider vertical />
          <MenuItem href="/" overrides={{
            stylePreset: "topNavItem"
          }}>
            Menu item 1
          </MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "topNavItem"
          }}>Menu item 2</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "topNavItem"
          }}>Menu item 3</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "topNavItem"
          }}>Menu item 4</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "topNavItem"
          }}>Menu item 5</MenuItem>
          <MenuItem href="/" overrides={{
            stylePreset: "topNavItem"
          }}>Menu item 6</MenuItem>
          <MenuSub
            title="Menu item 7"
            selected={moreExpanded}
            expanded={moreExpanded}
            onClick={() => {
              setMoreExpanded(!moreExpanded);
            }}
            overrides={{
              paddingInlineStart: '16px',
              stylePreset: "topNavItem"
            }}
          >
            <MenuItem href="/">Menu item 3.1</MenuItem>
            <MenuItem href="/">Menu item 3.2</MenuItem>
          </MenuSub>
        </Menu>
        </Stack>
      </TopNavContainer>
    </ThemeProvider>
  );
};
