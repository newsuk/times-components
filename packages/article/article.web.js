import React from "react";
import { View } from "react-native";
import { AdComposer } from "@times-components/ad";
import ArticleContent from "./article-content";

const Article = () => (
  <View>
    <AdComposer section="article" networkId="25436805">
      <ArticleContent code="ad-header" />
    </AdComposer>
  </View>
);

export default Article;
