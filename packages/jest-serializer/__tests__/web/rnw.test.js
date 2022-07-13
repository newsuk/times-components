/* eslint-disable react/prop-types */
import React from "react";
import { AppRegistry } from "react-native-web";
import { TcText, TcView } from "@times-components/utils";
import TestRenderer from "react-test-renderer";
import { addSerializers, rnw } from "../../src/index";

describe("The React Native Web serializer should", () => {
  it("remove rnw-classnames and hoist the styles", () => {
    addSerializers(expect, rnw(AppRegistry, ["color", "flex"]));

    const styles = {
      test: {
        color: "red",
        flex: 1,
        fontSize: 14
      }
    };

    const component = <TcText style={styles.test} testFunc={() => {}} />;
    const testRenderer = TestRenderer.create(component);

    expect(testRenderer).toMatchSnapshot();
  });

  it("effect children", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = {
      child: {
        fontSize: 9
      },
      parent: {
        flex: 1
      }
    };

    const component = (
      <TcView style={styles.parent}>
        <TcText style={styles.child}>Hello World!</TcText>
      </TcView>
    );
    const testRenderer = TestRenderer.create(component);

    expect(testRenderer).toMatchSnapshot();
  });

  it("effect multiple children", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = {
      child1: {
        fontSize: 9
      },
      child2: {
        fontSize: 10
      },
      child3: {
        fontSize: 11
      },
      parent: {
        backgroundColor: "red",
        flex: 1
      }
    };

    const component = (
      <TcView style={styles.parent}>
        <TcText style={styles.child1}>child 1</TcText>
        <TcText style={styles.child2}>child 2</TcText>
        <TcView>
          <TcText style={styles.child3}>child 3</TcText>
        </TcView>
      </TcView>
    );
    const testRenderer = TestRenderer.create(component);

    expect(testRenderer).toMatchSnapshot();
  });

  it("squash identical styles", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = {
      child1: {
        fontSize: 10
      },
      child2: {
        fontSize: 10
      },
      child3: {
        fontSize: 10
      },
      parent: {
        backgroundColor: "red",
        flex: 1
      }
    };

    const component = (
      <TcView style={styles.parent}>
        <TcText style={styles.child1}>child 1</TcText>
        <TcText style={styles.child2}>child 2</TcText>
        <TcView>
          <TcText style={styles.child3}>child 3</TcText>
        </TcView>
      </TcView>
    );
    const testRenderer = TestRenderer.create(component);

    expect(testRenderer).toMatchSnapshot();
  });

  it("effect render props", () => {
    addSerializers(expect, rnw(AppRegistry, ["flex", "fontSize"]));

    const styles = {
      child: {
        fontSize: 9
      },
      parent: {
        flex: 1
      }
    };

    const Container = ({ renderProp }) => <TcView prop={renderProp} />;

    const component = (
      <TcView style={styles.parent}>
        <Container renderProp={<TcText style={styles.child} />} />
      </TcView>
    );
    const testRenderer = TestRenderer.create(component);

    expect(testRenderer).toMatchSnapshot();
  });
});
