import React, { useState } from 'react';
import { TextField, ScreenReaderOnly, IconButton } from 'newskit';
import { NewsKitRoundedCloseIcon, NewsKitSearchIcon } from '../../assets';

type NavSearchProps = {
  isHamburger?: boolean
}

const NavSearch = ({ isHamburger }: NavSearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const presets = isHamburger ? {
    minHeight: '40px',
    stylePreset: 'searchBar'
  } : {
    width: '200px',
    minHeight: '100%',
    stylePreset: 'topNavSearch',
  }

  return (
    <>
      <TextField
        id={isHamburger ? undefined : "searchTimes"}
        aria-describedby="searchTimesLabel"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        placeholder="Search times.co.uk"
        overrides={{
          ...presets,
          typographyPreset: 'topNav010'
        }}
        startEnhancer={ isHamburger &&
          <NewsKitSearchIcon
            overrides={{ size: 'iconSize010', marginInline: 'space010' }}
          />
        }    
        endEnhancer={
          searchText &&
            <IconButton
              size="small"
              onClick={() => setSearchText('')}
              overrides={{
                stylePreset: 'topNavSearchClear',
                marginInline: 'space000'
              }}
            >
              <NewsKitRoundedCloseIcon />
            </IconButton>
        }
      />
      <ScreenReaderOnly id="searchTimesLabel">
        Search times.co.uk
      </ScreenReaderOnly>
    </>
  );
};

export default NavSearch;
