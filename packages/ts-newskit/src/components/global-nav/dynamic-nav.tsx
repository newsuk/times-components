import React from 'react';
import { ThemeProvider, Menu, MenuItem, MenuSub, styled, useMediaQueryObject } from 'newskit';

import { TimesWebLightTheme } from '../../theme';
// eslint-disable-next-line no-script-url
const href = 'javascript:;';

const splitMenuItems = (arr: MenuElement[], n: number) => {
  const visible = [...arr].splice(0, n);
  const invisible = [...arr].splice(n);
  return {visible, invisible};
};

type MenuElement = {
  title: string;
  items?: MenuElement[];
};

const createMenu = (items: MenuElement[]) =>
  items.map(({title, items: subItems}) => {
    if (subItems) {
      return <MenuSub title={title}>{createMenu(subItems)}</MenuSub>;
    }

    return <MenuItem href={href}>{title}</MenuItem>;
  });
const createMoreMenu = (items: MenuElement[]) =>
  items.map(({title, items: subItems}) => {
    if (subItems) {
      return (
        <MenuSub title={title} data-testid="more-sub-menu">
          {createMoreMenu(subItems)}
        </MenuSub>
      );
    }

    return <MenuItem href="{href}">{title}</MenuItem>;
  });

const MenuMore = ({children}: {children: React.ReactNode}) => (
  <MenuSub title="More">{children}</MenuSub>
);

const items: MenuElement[] = [
  {title: 'About'},
  {
    title: 'Guides',
  },
  {
    title: 'Theme',
  },
  {
    title: 'Components',
    items: [
      {title: 'Overview'},
      {
        title: 'Actions & Inputs',
        items: [{title: 'Button'}, {title: 'Checkbox'}, {title: 'Form'}],
      },
    ],
  },
];

const HorizontalContainerLarge = styled.div`
  min-height: 300px;
`;

// export const DynamicNav = () => {  
export const DynamicNav: React.FC<{}> = () => {
  const splitNumber = useMediaQueryObject({
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  });

  const {visible, invisible} = splitMenuItems(items, splitNumber || 1000);

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <HorizontalContainerLarge>
        <Menu aria-label="menu-multiple-auto">
          {createMenu(visible)}
          {invisible.length > 0 && (
            <MenuMore>{createMoreMenu(invisible)}</MenuMore>
          )}
        </Menu>
      </HorizontalContainerLarge>
    </ThemeProvider>
  );
};
