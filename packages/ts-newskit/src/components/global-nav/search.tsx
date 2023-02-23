import React, { useState } from 'react';
import { TextField, ScreenReaderOnly, IconButton } from 'newskit';
import { NewsKitRoundedCloseIcon } from '../../assets';

const NavSearch = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <>
      <TextField
        id="searchTimes"
        name="navSearch"
        aria-describedby="searchTimesLabel"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        placeholder="Search times.co.uk"
        overrides={{
          stylePreset: 'topNavSearch',
          typographyPreset: 'topNav010'
        }}
        endEnhancer={
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
