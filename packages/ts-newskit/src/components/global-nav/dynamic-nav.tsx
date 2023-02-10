import React from 'react';
import { ThemeProvider, Menu, MenuItem, MenuSub, styled, useMediaQueryObject, Visible } from 'newskit';

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
  {title: 'Home'},
  {title: 'News'},
  {title: 'Comment'},
  {title: 'Life & Style'},
  {title: 'Art & Books'},
  {title: 'Business & Money'},
  {title: 'Sport'},
  {title: 'Magazines'},
  {title: 'Puzzles'}
];

// Left this here to demonstrtae we can use a seconadary NAV
// automagically by including the data as structured below.
//
//
// const items: MenuElement[] = [
//   {title: 'Home'},
//   {title: 'News'},
//   {title: 'Comment'},
//   {title: 'Life & Style'},
//   {title: 'Art & Books'},
//   {title: 'Business & Money'},
//   {title: 'Sport'},
//   {title: 'Magazines'},
//   {title: 'Puzzles',
//    // Introduces a secondary nav is required
//     items: [
//     {title: 'Crosswords'},
//       // This introduces a third level Menu is require
//       {
//         title: 'Yesterday\'s Puzzles',
//         items: [{title: 'Button'}, {title: 'Checkbox'}, {title: 'Form'}],
//       },
//       {title: 'Sudoku'},
//       {title: 'Numberwang'},
//     ],
//   },
// ];

const HorizontalContainerLarge = styled.div`
  min-height: 50px;
`;

export const DynamicNav = () => {
  const splitNumber = useMediaQueryObject({
    xs: 0,
    sm: 0,
    md: 0,
    lg: 4,
    xl: 9,
  });

  const {visible, invisible} = splitMenuItems(items, splitNumber || 1000);

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <HorizontalContainerLarge>
        <Visible lg xl>
          <Menu aria-label="menu-multiple-auto">
            {createMenu(visible)}
            {invisible.length > 0 && (
              <MenuMore>{createMoreMenu(invisible)}</MenuMore>
            )}
          </Menu>
        </Visible>
      </HorizontalContainerLarge>
    </ThemeProvider>
  );
};
