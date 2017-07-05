import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Image from '@timescomponents/image';

const Photo = ({ uri }) => <Image source={{ uri }} style={styles.roundImage} />;
const Name = (props) => <Text style={styles.name}>{props.children}</Text>
const Title = (props) => <Text style={styles.title}>{props.children}</Text>
const TwitterHandle = (props) => <Text style={styles.twitter}>{props.children}</Text>
const Biography = (props) => <Text style={styles.bio}>{props.children}</Text>

class AuthorHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View accessibilityRole="banner" style={styles.container}>
        <View>
          <Name accessibilityRole="heading">{this.props.name}</Name>
          <Title accessibilityRole="heading" aria-level="2">{this.props.title.toLowerCase()}</Title>
          <TwitterHandle>{this.props.twitter}</TwitterHandle>
        </View>
        <View>
          <Biography>{this.props.bio}</Biography>
        </View>
        <View style={styles.photoContainer}>
          <Photo uri={this.props.uri} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F8F3',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  photoContainer: {
    left: '100%',
    bottom: -50
  },
  roundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EFEFEF',
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: '#FFF',
    left: '-66%',
    position: 'relative'
  },
  name: {
    textAlign: 'center',
    'fontSize': 30,
    'lineHeight': 30,
    'fontWeight': '400',
    'color': '#1D1D1B'
  },
  title: {
    textAlign: "center",
  },
  twitter: {
    textAlign: 'center',
    "fontSize": 15,
    'color': "#069"
  },
  bio: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 25,
    marginTop: 6
  }
});

export default AuthorHead;

export {
  Photo,
  AuthorHead as Header
}
