import React, { useState } from 'react';
import { Menu, MenuSub, MenuItem, MenuDivider, Block, TextField, customToNewsKitIcon, Button } from 'newskit';
import { ThemeProvider } from 'newskit/esm/theme';
import { Search } from '@emotion-icons/bootstrap/Search';
import styled from 'styled-components';

import { TimesWebLightTheme } from '../../theme';

const SearchIcon = customToNewsKitIcon(
    'SearchIcon',
    props => <Search {...props} />,
);

const MenuNav = styled(Menu)`
  &.menuNav {
    overflow-y: scroll;
    list-style: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 0;
    max-width: 290px;
    z-index: 9;
    &.showMenu {
      width: 100%;
    }
  }
`;

const NavButton = styled.button`
  &.navButton {
    position: fixed;
    top: 0;
  }
  &.hideButton {
    display: none
  }
`;

const more = ['E-paper', 'Newsletters', 'Magazine', 'TV Guide', 'Times +', 'Times Radio', 'Podcasts', 'Money Mentor', 'Times Travel', 'Wine Club', 'Rich List', 'Uni Guide', 'School Guide', 'Best places to live', 'Best places to stay', 'Growth 100', 'Announcements'];

export const NewMenu: React.FC<{}> = () => {
  const [navbarVisibility, setNavbarVisibility] = useState(false)
  const [expandedL1, setExpandedL1] = useState('');

  const handleOpen = () => {
    setNavbarVisibility(true)
  }

  const handleClose = () => {
    setNavbarVisibility(false)
  };

  const href = "hello"
  const L1Overrides = {
        stylePreset: 'menuItemL1',
      };
  const L2Overrides = {
    stylePreset: 'menuItemL2'
  };

  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <nav style={{width: '300px'}}>
      <NavButton onClick={handleOpen} className={`navButton ${navbarVisibility ? " hideButton" : " "}`}>{"Open"}</NavButton>
        <MenuNav className={`menuNav ${navbarVisibility ? " showMenu" : ""}`} aria-label="menu-vertical" vertical align="spaceBetween" overrides={{spaceInline: 'space000'}}>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
        <button onClick={handleClose}>X</button>
        <div>Placeholder</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
        <Button overrides={{stylePreset: "buttonSolidSecondary", width: '100%'}}>Login</Button>
        <Button overrides={{stylePreset: "buttonSolidPrimary", width: '100%'}}>Subscribe</Button>
        </div>
        <TextField
        id="icon-placement"
        aria-describedby="icon-placement-at"
        placeholder="Search"
        startEnhancer={
          <SearchIcon overrides={{size: 'iconSize010'}} />
        }
      />
        <MenuItem href={href} id="vertical-home" overrides={{...L1Overrides}}>
          Home
        </MenuItem>
        <MenuDivider />
          <MenuSub
            title="News"
            id="vertical-news"
            expanded={expandedL1 === 'news'}
            onClick={() => expandedL1 !== 'news' ? setExpandedL1('news'): setExpandedL1('')}
            overrides={{...L1Overrides}}
          >
            <MenuItem href={href} id="vertical-news1" overrides={{...L2Overrides}}>
              News 1
            </MenuItem>
            <MenuDivider />
            <MenuItem href={href} id="vertical-news2" overrides={{...L2Overrides}}>
              News 2
            </MenuItem>
            <MenuDivider />
              <MenuItem href={href} id="vertical-politics" overrides={{...L2Overrides}}>
                Politics
              </MenuItem>
              <MenuDivider />
          </MenuSub>
          <MenuDivider />

          <MenuSub
            title="Comment"
            id="vertical-comment"
            expanded={expandedL1 === 'comment'}
            onClick={() => expandedL1 !== 'comment' ? setExpandedL1('comment') : setExpandedL1('') }
            overrides={{...L1Overrides}}
          >
            <MenuItem href={href} id="vertical-overview" overrides={{...L2Overrides}}>
              Commenty
            </MenuItem>
            <MenuDivider />
          </MenuSub>
          <MenuDivider />
          <MenuSub
              title="Life & Style"
              id="vertical-life-and-style"
              expanded={expandedL1 === 'life-and-style'}
              onClick={() => expandedL1 !== 'life-and-style' ? setExpandedL1('life-and-style') : setExpandedL1('')}
              overrides={{...L1Overrides}}
            >
              <MenuItem href={href} id="vertical-fashion" overrides={{...L2Overrides}}>
                Fashion
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-food" overrides={{...L2Overrides}}>
                Food & Recipes
              </MenuItem>
              <MenuDivider />
            </MenuSub>
            <MenuDivider />
            <MenuSub
              title="Sport"
              id="vertical-sport"
              expanded={expandedL1 === 'sport'}
              onClick={() => expandedL1 !== 'sport' ? setExpandedL1('sport') : setExpandedL1('')}
              overrides={{...L1Overrides}}
            >
              <MenuItem href={href} id="vertical-top-stories" overrides={{...L2Overrides}}>
                Top stories
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-football" overrides={{...L2Overrides}}>
                Football
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-rugby-union" overrides={{...L2Overrides}}>
                Rugby Union
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-tennis" overrides={{...L2Overrides}}>
                Tennis
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-cricket" overrides={{...L2Overrides}}>
                Cricket
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-athletics" overrides={{...L2Overrides}}>
                Athletics
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-cycling" overrides={{...L2Overrides}}>
                Cycling
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-formula-one" overrides={{...L2Overrides}}>
                Formula One
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-golf" overrides={{...L2Overrides}}>
                Golf
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-horse-racing" overrides={{...L2Overrides}}>
                Horse Racing
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-boxing" overrides={{...L2Overrides}}>
                Boxing
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-other-sport" overrides={{...L2Overrides}}>
                Other sport
              </MenuItem>
              <MenuDivider />
              </MenuSub>
              <MenuDivider />
            <MenuSub
              title="Business & Money"
              id="vertical-business-money"
              expanded={expandedL1 === 'business'}
              onClick={() => expandedL1 !== 'business' ? setExpandedL1('business') : setExpandedL1('')}
              overrides={{...L1Overrides}}
            >
              <MenuItem href={href} id="vertical-business1" overrides={{...L2Overrides}}>
                Business 1
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-business2" overrides={{...L2Overrides}}>
                Business 2
              </MenuItem>
              <MenuDivider />
            </MenuSub>
            <MenuDivider />
            <MenuSub
              title="Puzzles"
              id="vertical-puzzles"
              expanded={expandedL1 === 'puzzles'}
              onClick={() => expandedL1 !== 'puzzles' ? setExpandedL1('puzzles') : setExpandedL1('')}
              overrides={{...L1Overrides}}
            >
              <MenuItem href={href} id="vertical-puzzle-club" overrides={{...L2Overrides}}>
                Puzzle Club
              </MenuItem>
              <MenuDivider />
              <MenuItem href={href} id="vertical-crossword" overrides={{...L2Overrides}}>
                Crossword
              </MenuItem>
              <MenuDivider />
            </MenuSub>
            <MenuDivider />
            <Block stylePreset="blockWrapper"
              paddingInline="space040"
              paddingBlock="space040">
                More
            </Block>
            {more.map(item => (
              <>
              <MenuItem href={href} id={`vertical-getting-${item}`} overrides={{...L1Overrides}}>{item}</MenuItem>
              <MenuDivider />
              </>
            ))}
        </MenuNav>
        </nav>
      </ThemeProvider>
  )
}