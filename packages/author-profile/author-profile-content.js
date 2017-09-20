import React, { Component } from "react";
import { ListView, View } from "react-native";
import PropTypes from "prop-types";
import _round from "lodash.round";
import { addTracking } from "@times-components/tracking";
import AuthorProfileHeader, {
  AuthorProfileHeaderWithTracking
} from "./author-profile-header";

import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const makeAuthorProfileContent = Header => {
  class AuthorProfileContent extends Component {
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.state = {
        dataSource: ds.cloneWithRows(props.articles.list)
      };
    }

    render() {
      const onViewed = this.props.onViewed;

      return (
        <View>
          <Header {...this.props} />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => <AuthorProfileItem {...rowData} />}
            renderSeparator={(sectionId, rowId) => (
              <AuthorProfileItemSeparator key={rowId} />
            )}
            onChangeVisibleRows={({ s1 }) =>
              Object.keys(s1).forEach(indx => {
                if (s1[indx]) {
                  onViewed({
                    ...this.props.articles.list[indx],
                    index: parseInt(indx, 10),
                    total: this.props.articles.count
                  });
                }
              })}
          />
        </View>
      );
    }
  }

  AuthorProfileContent.propTypes = Object.assign(
    {
      articles: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
      })
    },
    Header.propTypes
  );

  AuthorProfileContent.defaultProps = {
    onViewed: () => {}
  };

  return AuthorProfileContent;
};

export const AuthorProfileContentWithTracking = addTracking(
  makeAuthorProfileContent(AuthorProfileHeaderWithTracking),
  {
    trackChildViews: {
      id: "id",
      attrs: {
        index: props => props.index,
        progress: props => _round((props.index + 1) / props.total * 100, 2)
      },
      listPath: "articles.list"
    }
  }
);

export default makeAuthorProfileContent(AuthorProfileHeader);
