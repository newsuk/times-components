import React from "react";
import { render } from "enzyme";

import ArticleLink from "../../src/article-body/article-link.web";

describe("Article Link", () => {
  const props = {
    dropCap: true,
    onPress: null,
    url: "www.example.com",
    target: "target",
    children: ["A"]
  };

  it("should render with the dropCap link not underlined", () => {
    const component = render(<ArticleLink {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("should render with the link underlined", () => {
    props.children = ["a link"];

    const component = render(<ArticleLink {...props} />);
    expect(component).toMatchSnapshot();
  });
});
