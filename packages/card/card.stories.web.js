/* eslint-disable react/no-danger */
import React from "react";
import ReactDOMServer from "react-dom/server";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { LateralSpacingDecorator } from "@times-components/storybook/decorators";
import ArticleSummary from "@times-components/article-summary";
import Card from "./card";
import articleSummaryProps from "./fixtures/article-summary-props";

const cardProps = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360,
  showImage: true
};

storiesOf("Card", module)
  .addDecorator(LateralSpacingDecorator)
  .add("Static rendering (web only)", () => {
    const markup = {
      __html: ReactDOMServer.renderToStaticMarkup(
        <Card {...cardProps}>
          <ArticleSummary {...articleSummaryProps} />
        </Card>
      )
    };

    return <div dangerouslySetInnerHTML={markup} />;
  });
