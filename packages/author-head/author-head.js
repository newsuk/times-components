import React, { Component } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const Photo = ({ uri }) => <Image source={{ uri }} style={styles.roundImage} />;
const Name = () => <Text style={styles.name} />;
const Title = () => <Text style={styles.title} />;

class AuthorHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <Photo uri={this.props.uri} />
        <div>
          <Name>{this.props.name}</Name>
          <Title>{this.props.title}</Title>
        </div>
      </header>
    )
  }
}

const styles = StyleSheet.create({
  roundImage: {
    'border-radius': '100%',
    'background-color': '#EFEFEF',
    'border': '5px solid #FFF',
    'vertical-align': 'middle',
    'max-width': '100%'
  },
  name: {
    'font-size': '3rem',
    'line-height': '3rem',
    'font-weight': '400',
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
