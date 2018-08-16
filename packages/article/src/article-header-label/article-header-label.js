import React from "react";
import { View } from "react-native";
import { spacing } from "@times-components/styleguide";
import BaseLabel from "./article-header-label.base";

export default BaseLabel((props, label) => <View {...props} style={{marginTop: spacing(2), marginBottom: spacing(0)}}>{label}</View>);
