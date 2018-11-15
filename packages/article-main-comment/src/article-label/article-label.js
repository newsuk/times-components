import React from "react";
import { View } from "react-native";
import ArticleLabel from "@times-components/article-label";
import Context from "@times-components/context";
import styles from "../styles";

export default (props) => (
  <Context.Consumer>
      {({ theme: { sectionColour } }) => (
        <View style={{marginTop: 25, marginBottom: 10}}>
          <ArticleLabel color={sectionColour || colours.section.default} title={props.label} />
        </View>
      )}
    </Context.Consumer>
);
