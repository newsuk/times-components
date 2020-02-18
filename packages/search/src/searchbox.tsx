import React, { ReactElement } from 'react';
import { connectSearchBox } from 'react-instantsearch-native';
import { TextInput, View } from 'react-native';
import styles from './styles';

interface SearchBoxProps {
  currentRefinement: any;
  refine: any;
  hide: any;
  show: any;
}

class SearchBox extends React.Component<SearchBoxProps> {
  public handleText = (value: string) => {
    const { show, hide, refine } = this.props
    if (value === "") {
      hide()
    } else {
      show()
    }
    refine(value)
  }

  public render(): ReactElement {
    const { currentRefinement } = this.props
    return (  <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        onChangeText={this.handleText}
        value={currentRefinement}
        placeholder=""
      />
    </View>)
  }
}

export default connectSearchBox(SearchBox);
