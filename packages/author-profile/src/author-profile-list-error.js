import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const AuthorProfileListError = ({ refetch }) => (
  <View style={styles.listErrorContainer}>
    <Text style={styles.listErrorHeading}>Something&apos;s gone wrong</Text>
    <Text style={styles.listErrorMessage}>
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </Text>
    <View style={styles.listErrorButtonContainer}>
      <TouchableOpacity accessible accessibilityLabel="Retry" onPress={refetch}>
        <View style={styles.listErrorButton}>
          <Text style={styles.listErrorButtonText}>RETRY</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

AuthorProfileListError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileListError;
