import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import styles from "./styles";

const ArticleError = ({ refetch }) => (
  <ScrollView>
    <View style={styles.errorContainer}>
      <View>
        <Image
          accessibilityLabel="Server error"
          accessible
          resizeMode="contain"
          // eslint-disable-next-line global-require
          source={require("../assets/article-error.png")}
          style={[styles.errorImageContainer, { height: 270, width: 240 }]}
        />

        <Text style={styles.errorHeading}>Something&apos;s gone wrong</Text>
        <Text style={styles.errorMessage}>
          We can&apos;t load the page you have requested. Please check your
          network connection and retry to continue
        </Text>
      </View>
      <Button onPress={refetch} title="Retry" />
    </View>
  </ScrollView>
);

ArticleError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default ArticleError;
