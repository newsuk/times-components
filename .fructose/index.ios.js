/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { getUI, addComponent } from "hjkadshhjkl-app";
import Author from "../packages/author";

export default class Fructose extends Component {
  constructor() {
    super();
    this.state = { harness: <Text>Harness</Text> };
  }

  componentDidMount() {
    addComponent("Author", Author);
    this.setState({ harness: getUI() });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.harness}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

AppRegistry.registerComponent("storybooknative", () => Fructose);
