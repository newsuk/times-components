import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Pagination from "./pagination";

storiesOf("Pagination", module)
  .add("First page", () => <Pagination page={0} total={60} />)
  .add("Another page", () => <Pagination page={1} total={60} />)
  .add("Last page", () => <Pagination page={2} total={60} />);
