import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ArticleListError from "../src/article-list-error";
import ArticleListItemSeparator from "../src/article-list-item-separator";
import ArticleListPageError from "../src/article-list-page-error";
import ArticleListPagination from "../src/article-list-pagination";

export default () => {
  it("should render an article list page error correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListError refetch={refetchMock} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should handle the retry button in the article list page error correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListError refetch={refetchMock} />);

    wrapper.find("TouchableOpacity").simulate("press");

    expect(refetchMock).toHaveBeenCalled();
  });

  it("should render the article list item separator keyline correctly", () => {
    const wrapper = shallow(<ArticleListItemSeparator />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render the article list page error correctly", () => {
    const wrapper = shallow(<ArticleListPageError refetch={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render the article list pagination correctly", () => {
    const tree = renderer.create(
      <ArticleListPagination count={20} page={1} pageSize={10} />
    );

    expect(tree).toMatchSnapshot();
  });
};
