import PropTypes from 'prop-types';
import React from 'react';
import { connectSearchBox } from 'react-instantsearch-native';
import { TextInput, View } from 'react-native';
import styles from './styles';

interface SearchBoxProps {
  currentRefinement: any;
  refine: any;
}

const SearchBox = ({ currentRefinement, refine }: SearchBoxProps) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.input}
      onChangeText={value => refine(value)}
      value={currentRefinement}
      placeholder=""
    />
  </View>
);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired
};

export default connectSearchBox(SearchBox);
