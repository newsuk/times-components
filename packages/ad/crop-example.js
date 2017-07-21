import React, { Component } from 'react';
import { Text, View, Image, ImageEditor } from 'react-native';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      croppedImageURI: null,
      cropError: null,
    };
    this.cropImage();
  }

  cropImage() {
    const transformData = {
      offset: {
        x: 0,
        y: 0,
      },
      size: {
        width: 300,
        height: 250,
      },
    };

    ImageEditor.cropImage(
      'https://c1.staticflickr.com/9/8073/28582653114_d154039cb9_k.jpg',
      transformData,
      croppedImageURI => {
        this.setState({
          croppedImageURI
        });
      },
      cropError => {
        this.setState({
          cropError
        });
      }
    );
  }

  render() {
    if (!this.state.cropError && !this.state.croppedImageURI) {
      return (
          <Text>Loading...</Text>
        );
    }
    else if (this.state.cropError) {
      return (
        <Text>{this.state.cropError}</Text>
      );
    }

    return (
      <View>
        <Text>Image Cropped Example</Text>
        <Text>{ this.state.croppedImageURI }</Text>
        <Image
          source={{uri: this.state.croppedImageURI}}
          width="300"
          height="250"
        />
      </View>
    );
  }
}
