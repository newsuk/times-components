import React, { useState } from 'react';
import { ThemeProvider, Menu } from 'newskit';
import { TimesWebLightTheme } from '../../theme';
import { Navigator } from './navigator';
import { SecondaryMenuItem } from './types';
import { NavItems } from './navItems';

export const SecondaryNavMobile: React.FC<{
  data: SecondaryMenuItem[];
  title: string;
  isActive:boolean
}> = ({ data, title , isActive = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isActive);
  const subMenuTitle = isExpanded ? 'Close' : 'See all';

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <Menu vertical aria-label="Secondary Navigation">
        <Navigator
          title={title}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          subMenuTitle={subMenuTitle}
        />
        {isExpanded ? <NavItems data={data} /> : null}
      </Menu>
    </ThemeProvider>
  );
};
