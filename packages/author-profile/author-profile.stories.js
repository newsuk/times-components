import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import AuthorProfile from "./author-profile";

storiesOf("AuthorProfile", module).add("AuthorProfile", () =>
  <AuthorProfile />
);
