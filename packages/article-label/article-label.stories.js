import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { select } from '@storybook/addon-knobs/react';
import ArticleLabel from "./article-label";

 // This is fixed in a future version of Storybook; waiting on release
 const swap = obj => {
    let ret = {};
    for(var key in obj){
      ret[obj[key]] = key;
    }
    return ret;
  }

  // Waiting on styleguide approval
  const options = {
    thedish: "#db133b",
    sport: "#008347",
    comment: "#850029"
  }

storiesOf("Primitives/ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel title="swimming" color={select("Section", swap(options), "sport")} />
));
