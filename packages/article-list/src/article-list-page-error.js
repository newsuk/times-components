import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import ArticleListError from "./article-list-error";
import propTypes from "./article-list-error-prop-types";
import styles from "./styles";

const ArticleListPageError = ({ refetch }) => (
  <View style={styles.pageErrorContainer}>
    <View style={styles.pageErrorImageContainer}>
      <Image
        aspectRatio={700 / 770}
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
      />
    </View>
    <ArticleListError refetch={refetch} />
  </View>
);

ArticleListPageError.propTypes = propTypes;

export default ArticleListPageError;
