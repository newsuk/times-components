import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from "prop-types";

import Image from '@times-components/image';

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
    // borderStyle: 'solid',
    borderColor: '#FFF',
    left: '-66%',
    position: 'relative'
  },
  name: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '400',
    color: '#1D1D1B'
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

const Photo = ({ uri }) => <Image source={{ uri }} style={styles.roundImage} />;
const Name = ({ children }) => <Text style={styles.name}>{ children }</Text>
const Title = ({ children }) => <Text style={styles.title}>{ children }</Text>
const TwitterHandle = ({ children }) => <Text style={styles.twitter}>{ children }</Text>
const Biography = ({ children }) => <Text style={styles.bio}>{ children }</Text>

const AuthorHead = (props) => {
  const {
    name,
    title,
    twitter,
    bio,
    uri
  } = props;

  return (
    <View accessibilityRole="banner" style={styles.container}>
      <View>
        <Name accessibilityRole="heading" aria-level="1">{ name }</Name>
        <Title accessibilityRole="heading" aria-level="2">{ title.toLowerCase() }</Title>
        <TwitterHandle>{ twitter }</TwitterHandle>
      </View>
      <View>
        <Biography>{ bio }</Biography>
      </View>
      <View style={styles.photoContainer}>
        <Photo uri={ uri } />
      </View>
    </View>
  )
}

AuthorHead.defaultProps = {
  name: '',
  title: '',
  bio: '',
  uri: '',
  twitter: ''
};

AuthorHead.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  bio: PropTypes.string,
  uri: PropTypes.string,
  twitter: PropTypes.string
};

export default AuthorHead;

export {
  Photo,
  Name,
  Title,
  TwitterHandle,
  Biography,
  AuthorHead as Header
}
