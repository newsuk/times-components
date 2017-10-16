/* eslint-env jest */

import "react-native";
import renderer from "react-test-renderer";
import ArticleSummaryRenderer from "../article-summary-renderer";

it("renders a paragraph ending with a full stop and a space with no new line", () => {
  const output = renderer
    .create(ArticleSummaryRenderer.paragraph("some-key", {}, "Content"))
    .toJSON();
  expect(output).toMatchSnapshot();
});

it("renders a teaser with an ellipsis at the end", () => {
  const output = renderer
    .create(ArticleSummaryRenderer.teaser("some-key", {}, "Content"))
    .toJSON();

  expect(output).toMatchSnapshot();
});
