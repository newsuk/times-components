import React from "react";
import { TcText } from "@times-components/utils";
import { ResponsiveContext } from "@times-components/responsive";
import { iterator } from "@times-components/test-utils";
import Card from "../src/card";

const props = {
  highResSize: 900,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 25,
  showImage: true
};

const withTabletContext = WrappedComponent => (
  <ResponsiveContext.Provider value={{ isTablet: true, screenWidth: 1000 }}>
    {WrappedComponent}
  </ResponsiveContext.Provider>
);

export default renderMethod => {
  jest.useFakeTimers();

  const tests = [
    {
      name: "card default state",
      test: () => {
        const output = renderMethod(
          withTabletContext(
            <Card {...props}>
              <TcText>A card</TcText>
            </Card>
          )
        );

        jest.runTimersToTime();

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
