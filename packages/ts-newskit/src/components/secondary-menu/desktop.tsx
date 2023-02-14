import React, { useState } from 'react';
import { ThemeProvider, MenuItem } from 'newskit';
import { TimesWebLightTheme } from '../../theme';
import { MenuDivider, MainMenu } from './styles';
import { SecondaryMenuItem } from './types';

export const SecondaryNavDesktop: React.FC<{ data: SecondaryMenuItem[] }> = ({
  data
}) => {
  const [selected, setSelected] = useState("");

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <MainMenu
        aria-label="Secondary Navigation"
        overrides={{ spaceInline: 'space050' }}
        align="center"
      >
        {data.map(item => (
          <MenuItem
            overrides={{ stylePreset: 'menuItemDesktop' }}
            href={item.url}
            selected={selected === item.url}
            onClick={() => setSelected(item.url)}
          >
            {item.title}
          </MenuItem>
        ))}
      </MainMenu>
      <MenuDivider />
    </ThemeProvider>
  );
};
