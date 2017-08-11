import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Link from "./link";

storiesOf("Link", module)
  .add("Link", () =>
    <Link url="https://www.thetimes.co.uk/"> click to open The Times </Link>
  )
  .add("Link with styles", () =>
    <Link url="https://www.thetimes.co.uk/" style={{ color: "red" }}>
      click to open The Times
    </Link>
  );
