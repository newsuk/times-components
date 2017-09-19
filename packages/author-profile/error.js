import React from "react";
import { Text } from "react-native";

export default props => <Text>{JSON.stringify(props, null, 2)}</Text>;
