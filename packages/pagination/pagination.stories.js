import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Pagination from "./pagination";

const story = m => <View style={{ paddingTop: 20 }}>{m}</View>;

storiesOf("Pagination", module)
  .add("First page", () => story(<Pagination page={1} count={60} />))
  .add("Another page", () => story(<Pagination page={2} count={60} />))
  .add("Last page", () => story(<Pagination page={3} count={60} />));
