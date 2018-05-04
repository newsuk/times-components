import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ArticleListError from "../src/article-list-error";
import ArticleListItemSeparator from "../src/article-list-item-separator";
import ArticleListItem from "../src/article-list-item";
import ArticleListPageError from "../src/article-list-page-error";
import ArticleListPagination from "../src/article-list-pagination";
import {
  longSummary,
  shortSummary,
  summary
} from "../fixtures/article-list-item-summaries.json";

export default () => {
  const listItemProps = {
    headline: "test headline",
    imageRatio: 3 / 2,
    imageSize: 100,
    isLoading: false,
    label: "TESTLABEL",
    longSummary,
    publicationName: "TIMES",
    shortSummary,
    showImage: true,
    summary,
    url: "www.test-example.com"
  };

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

  it("should render an article list item", () => {
    const wrapper = renderer.create(<ArticleListItem {...listItemProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should handle the link to an article from an article list item", () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <ArticleListItem {...listItemProps} onPress={onPressMock} />
    );

    wrapper.simulate("press");

    expect(onPressMock).toHaveBeenCalled();
  });

  it("should render an article list item loading state", () => {
    const wrapper = renderer.create(<ArticleListItem {...listItemProps} isLoading />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render an article list item without images", () => {
    const wrapper = renderer.create(
      <ArticleListItem {...listItemProps} showImage={false} />
    );

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
