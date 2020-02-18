import * as React from 'react';
import { InstantSearch } from 'react-instantsearch-native';
import { View } from 'react-native';
import searchClient from './client';
import Results from './results';
import SearchBox from './searchbox';
import styles from './styles';

class Search extends React.Component {
  public state = {
    shouldShowResults: false
  }

  public showResults = () => {
    this.setState({
      shouldShowResults: true
    })
  }

  public hideResults = () => {
    this.setState({
      shouldShowResults: false
    })
  }

  public render(): React.ReactElement {
    const { shouldShowResults } = this.state;

    return (
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="dev_articles">
          <SearchBox show={this.showResults} hide={this.hideResults} />
          {shouldShowResults && <Results />}
        </InstantSearch>
      </View>
    );
  }
}

export default Search;
