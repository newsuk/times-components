// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { useState } from 'react';
import { ScreenReaderOnly, IconButton, Form } from 'newskit';
import { NewsKitRoundedCloseIcon, NewsKitSearchIcon } from '../../../../assets';
import { handleSearchSubmit } from './handleSearchSubmit';
import { StyledTextField } from '../styles';

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
    <Form
      onSubmit={() =>
        handleSearchSubmit(isHamburger ? 'mobile' : 'desktop', searchText)
      }
      role="search"
    >
      <StyledTextField
        id={isHamburger ? undefined : 'searchTimes'}
        aria-describedby="searchTimesLabel"
        value={searchText}
        autoFocus
        onChange={event => setSearchText(event.target.value)}
        placeholder="Search"
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
    </Form>
  );
};

export default NavSearch;
