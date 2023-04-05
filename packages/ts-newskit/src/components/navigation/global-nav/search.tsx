import React, { useState } from 'react';
import { TextField, ScreenReaderOnly, IconButton } from 'newskit';
import { NewsKitRoundedCloseIcon, NewsKitSearchIcon } from '../../../assets';

type NavSearchProps = {
  isHamburger?: boolean;
};

const NavSearch = ({ isHamburger }: NavSearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const presets = isHamburger
    ? {
        minHeight: '40px',
        stylePreset: 'hamburgerSearch'
      }
    : {
        width: '200px',
        minHeight: '100%',
        stylePreset: 'topNavSearch'
      };

  return (
    <>
      <TextField
        id={isHamburger ? undefined : 'searchTimes'}
        aria-describedby="searchTimesLabel"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        placeholder="Search times.co.uk"
        overrides={{
          ...presets,
          typographyPreset: 'topNav010'
        }}
        startEnhancer={
          isHamburger && (
            <NewsKitSearchIcon
              overrides={{ size: 'iconSize010', marginInline: 'space010' }}
            />
          )
        }
        endEnhancer={
          searchText && (
            <IconButton
              size="small"
              onClick={() => setSearchText('')}
              overrides={{
                minHeight: 'sizing040',
                minWidth: 'sizing040',
                stylePreset: 'searchClear',
                marginInline: 'space000'
              }}
              aria-label="Clear search"
            >
              <NewsKitRoundedCloseIcon />
            </IconButton>
          )
        }
      />
      <ScreenReaderOnly id="searchTimesLabel">
        Search times.co.uk
      </ScreenReaderOnly>
    </>
  );
};

export default NavSearch;
