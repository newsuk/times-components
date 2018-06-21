import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ArticleByline from "../src/article-byline";
import authorsFixture from "../fixtures/authors.json";

export default Component => {
  const renderArticleByline = props =>
    renderer.create(
      <View>
        <Component {...props} />
      </View>
    );

  if (Component.displayName === "ArticleBylineWithLinks") {
    it("should handle the onPress event", () => {
      const onAuthorPressMock = jest.fn();
      const wrapper = shallow(
        <Component
          ast={authorsFixture.singleAuthor}
          onAuthorPress={onAuthorPressMock}
        />
      );

      wrapper
        .at(0)
        .dive()
        .find("Text")
        .simulate("press");

      expect(onAuthorPressMock).toHaveBeenCalled();
    });

    it("should handle an empty onPress event", () => {
      const wrapper = shallow(<Component ast={authorsFixture.singleAuthor} />);

      expect(() =>
        wrapper
          .at(0)
          .dive()
          .find("Text")
          .simulate("press")
      ).not.toThrow();
    });
  }

  it("should render with a single inline element", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.singleInlineElement
    });

    expect(tree).toMatchSnapshot("1. Render an inline element");
  });

  it("should render with the author in the begining", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.authorInTheBeginning
    });

    expect(tree).toMatchSnapshot("2. Render an author first");
  });

  it("should render with the author at the end", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.authorAtTheEnd
    });

    expect(tree).toMatchSnapshot("3. Render an author last");
  });

  it("should render with multiple authors separated by text with commas", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.multipleAuthorsCommaSeparated
    });

    expect(tree).toMatchSnapshot(
      "4. Render multiple authors separated by commas"
    );
  });

  it("should render with multiple authors separated by spaces", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.multipleAuthorsSpaceSeparated
    });

    expect(tree).toMatchSnapshot(
      "5. Render multiple authors separated by spaces"
    );
  });

  it("should render null with an empty AST", () => {
    const tree = renderer.create(<ArticleByline ast={[]} />);

    expect(tree).toMatchSnapshot("6. Render null when AST is empty");
  });
};
