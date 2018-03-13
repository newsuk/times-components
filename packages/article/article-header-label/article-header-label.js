import React from "react";
import { View } from "react-native";
import BaseLabel from "./article-header-label.base";

export default BaseLabel((props, label) => <View {...props}>{label}</View>);
