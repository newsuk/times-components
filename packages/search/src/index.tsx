import * as React from 'react';
import { InstantSearch } from 'react-instantsearch-native';
import { View } from 'react-native';
import searchClient from './client';
import Results from './results';
import SearchBox from './searchbox';
import styles from './styles';

class Search extends React.Component {
  public render(): React.ReactElement {
    return (
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="dev_articles">
          <SearchBox />
          <Results />
        </InstantSearch>
      </View>
    );
  }
}

export default Search;
