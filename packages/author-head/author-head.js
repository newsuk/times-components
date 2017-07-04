import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Image from '@timescomponents/image';

const Photo = ({ source }) => <Image source={{ source }} style={styles.roundImage} />;
const Name = () => <Text style={styles.name} />;
const Title = () => <Text style={styles.title} />;

class AuthorHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Photo uri={this.props.uri} />
        <View>
          <Name>{this.props.name}</Name>
          <Title>{this.props.title}</Title>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  roundImage: {
    'borderRadius': 100,
    'backgroundColor': '#EFEFEF',
    'borderStyle': 'solid',
    'borderWidth': 5,
    'maxWidth': '100%'
  },
  name: {
    'fontSize': 3,
    'lineHeight': 3,
    'fontWeight': '400',
    'color': '#1D1D1B'
  }
});

export default AuthorHead;

export {
  Photo,
  Name,
  Title,
  AuthorHead as Header
}
