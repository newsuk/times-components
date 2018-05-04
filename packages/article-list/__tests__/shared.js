import "react-native";
import React from "react";
import { shallow } from "enzyme";
import ArticleListError from "../src/article-list-error";
import ArticleListItemSeparator from "../src/article-list-item-separator";
import ArticleListPageError from "../src/article-list-page-error";

export default () => {
  it("should render the error component correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListError refetch={refetchMock} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should handle the retry button in the error component correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListError refetch={refetchMock} />);

    wrapper.find("TouchableOpacity").simulate("press");

    expect(refetchMock).toHaveBeenCalled();
  });

  it("should render the separator keyline correctly", () => {
    const wrapper = shallow(<ArticleListItemSeparator />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render the article page error correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListPageError refetch={refetchMock} />);

    expect(wrapper).toMatchSnapshot();
  });
};
