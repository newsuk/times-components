/* eslint-disable react/prop-types */

import React from "react";
import { AppRegistry } from "react-native-web";
import { StyleSheet, Text, View } from "react-native";
import renderer from "react-test-renderer";
import { addSerializers, rnw } from "../../src/index";

describe("The React Native Web serializer should", () => {
  it("remove rnw-classnames and hoist the styles", () => {
    addSerializers(expect, rnw(AppRegistry, ["color", "flex"]));

    const styles = StyleSheet.create({
      test: {
        color: "red",
        flex: 1,
        fontSize: 14
      }
    });

    const component = <Text style={styles.test} testFunc={() => {}} />;
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("effect children", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = StyleSheet.create({
      parent: {
        flex: 1
      },
      child: {
        fontSize: 9
      }
    });

    const component = (
      <View style={styles.parent}>
        <Text style={styles.child}>Hello World!</Text>
      </View>
    );
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("effect multiple children", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = StyleSheet.create({
      parent: {
        flex: 1,
        backgroundColor: "red"
      },
      child1: {
        fontSize: 9
      },
      child2: {
        fontSize: 10
      },
      child3: {
        fontSize: 11
      }
    });

    const component = (
      <View style={styles.parent}>
        <Text style={styles.child1}>child 1</Text>
        <Text style={styles.child2}>child 2</Text>
        <View>
          <Text style={styles.child3}>child 3</Text>
        </View>
      </View>
    );
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("squash identical styles", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = StyleSheet.create({
      parent: {
        flex: 1,
        backgroundColor: "red"
      },
      child1: {
        fontSize: 10
      },
      child2: {
        fontSize: 10
      },
      child3: {
        fontSize: 10
      }
    });

    const component = (
      <View style={styles.parent}>
        <Text style={styles.child1}>child 1</Text>
        <Text style={styles.child2}>child 2</Text>
        <View>
          <Text style={styles.child3}>child 3</Text>
        </View>
      </View>
    );
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("effect render props", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = StyleSheet.create({
      parent: {
        flex: 1
      },
      child: {
        fontSize: 9
      }
    });

    const Container = ({ renderProp }) => <View prop={renderProp} />;

    const component = (
      <View style={styles.parent}>
        <Container renderProp={<Text style={styles.child} />} />
      </View>
    );
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
