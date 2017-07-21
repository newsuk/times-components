import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Image, Text, ImageEditor } from "react-native";
import PropTypes from "prop-types";

import TimesWatermark from './assets/TimesWatermark';

const getStyles = config =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
    wrapper: {
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "#F9F9F9",
      width: 300, // TODO change
      height: config.maxHeight,
    },
    placeholderText: {
      fontSize: 12,
      fontFamily: "TimesDigital-Regular",
      backgroundColor: "#F9F9F9",
      color: "#696969",
      textTransform: "uppercase",
      borderColor: "#D8D8D8",
      borderWidth: 1,
      borderStyle: "solid",
      position: "absolute",
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      letterSpacing: 1.5
    }
  });

class Placeholder extends Component {
  render() {
    const styles = getStyles(this.props.config);

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TimesWatermark width={300} height={this.props.config.maxHeight}/>
          <Text style={styles.placeholderText}>Advertisement</Text>
        </View>
      </View>
    );
  }
}

Placeholder.propTypes = {
  // TODO add SIZES
};

export default Placeholder;
