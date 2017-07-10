import React from "react";
import { View, ListView, StyleSheet } from "react-native";
import Card from "@times-components/card";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  },
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center"
  }
});

const Row = article =>
  <View>
    <Card {...article} />
  </View>;

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    const articlesDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      articles: articlesDataSource.cloneWithRows(props.articles)
    };
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.articles}
        renderRow={data => <Row {...data} />}
        renderSeparator={(sectionId, rowId) =>
          <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(Card.propTypes))
};

export default ArticleList;
