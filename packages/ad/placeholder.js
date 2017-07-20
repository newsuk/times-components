import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
// import ImageCrop from 'react-native-image-crop';
import PropTypes from "prop-types";

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
    placeholderImage: {
      width: 300,
      height: 250, // config.maxHeight
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
      paddingLeft: 15,
      paddingRight: 15,
      letterSpacing: 1.5
    }
  });

class Placeholder extends Component {
  render() {
    const styles = getStyles(this.props.config);


    // return (
    //   <View style={styles.container}>
    //     <View style={styles.wrapper}>
    //       <ImageCrop
    //         ref={(c) => { this.imageCrop = c; }}
    //         cropWidth={500}
    //         cropHeight={500}
    //         source={{
    //           uri: 'https://c1.staticflickr.com/9/8073/28582653114_d154039cb9_k.jpg',
    //         }}
    //       />
    //       <Text style={styles.placeholderText}>Advertisement</Text>
    //     </View>
    //   </View>
    // );

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            source={{
              uri: require('./assets/Watermark.svg')
            }}
            style={styles.placeholderImage}/>
          <Text style={styles.placeholderText}>Advertisement</Text>
        </View>
      </View>
    );
  }
}

Placeholder.propTypes = {
  // SIZES
};

export default Placeholder;
