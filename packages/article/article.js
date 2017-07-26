import React, { Component } from "react";
import { ScrollView, Text, Platform } from "react-native";
import Ad, { AdComposer } from "@times-components/ad";

class Article extends Component {
  static renderAd() {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      return <Ad code="intervention" section="article" />;
    }

    return (
      <AdComposer section="article" networkId="25436805">
        <Ad code="ad-header" />
      </AdComposer>
    );
  }

  render() {
    return (
      <ScrollView>
        <Text>Default Article.</Text>
        {Article.renderAd()}
      </ScrollView>
    );
  }
}

export default Article;
