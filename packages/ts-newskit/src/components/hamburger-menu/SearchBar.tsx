import React from 'react';
import { TextField } from 'newskit';
import { NewsKitSearchIcon } from './icons';

const SearchBar: React.FC<{}> = () => (
  <TextField
    size="small"
    id="icon-placement"
    aria-label="Search times.co.uk"
    aria-describedby="icon-placement-at"
    placeholder="Search times.co.uk"
    startEnhancer={
      <NewsKitSearchIcon
        overrides={{ size: 'iconSize010', marginInline: 'space010' }}
      />
    }
    overrides={{ stylePreset: 'searchBar' }}
  />
);

export default SearchBar;
