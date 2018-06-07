import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ArticleList from "../src/article-list";
import ArticleListItemSeparator from "../src/article-list-item-separator";
import ArticleListItem from "../src/article-list-item";
import ArticleListError from "../src/article-list-error";
import ArticleListPageError from "../src/article-list-page-error";
import {
  longSummary,
  shortSummary,
  summary
} from "../fixtures/article-list-item-summaries.json";
import articleListProps from "./default-article-list-props";
import pagedResult from "./paged-result";

export default () => {
  const realIntl = Intl;

  const listItemProps = {
    headline: "test headline",
    id: "test id",
    imageRatio: 3 / 2,
    index: 5,
    length: 20,
    imageSize: 100,
    isLoading: false,
    label: "TESTLABEL",
    leadAsset: {
      crop: {
        url: "/test-item-image-url"
      }
    },
    longSummary,
    publicationName: "TIMES",
    publishedTime: "2017-11-17T00:01:00.000Z",
    shortSummary,
    showImage: true,
    summary,
    url: "/test-article-url"
  };

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("should render the article list error content correctly", () => {
    const wrapper = shallow(<ArticleListError />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render an article list page error correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListPageError refetch={refetchMock} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should handle the retry button in the article list page error correctly", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(<ArticleListPageError refetch={refetchMock} />);

    wrapper
      .find("Button")
      .dive()
      .find("TouchableHighlight")
      .simulate("press");

    expect(refetchMock).toHaveBeenCalled();
  });

  it("should render the article list item separator keyline correctly", () => {
    const wrapper = shallow(<ArticleListItemSeparator />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render an article list item", () => {
    const tree = renderer.create(<ArticleListItem {...listItemProps} />);

    expect(tree).toMatchSnapshot();
  });

  it("should handle the link to an article from an article list item with analytics", () => {
    const onPressMock = jest.fn();
    const analyticsMock = jest.fn();
    const wrapper = shallow(
      <ArticleListItem {...listItemProps} onPress={onPressMock} />,
      {
        context: { tracking: { analytics: analyticsMock } }
      }
    );

    wrapper.simulate("press");

    expect(onPressMock).toHaveBeenCalled();
    expect(analyticsMock).toHaveBeenCalledWith({
      component: "ArticleListItem",
      action: "Pressed",
      attrs: {
        articleId: "test id",
        articleHeadline: "test headline",
        scrollDepth: {
          itemNumber: 6,
          total: 20
        }
      }
    });
  });

  it("should render an article list item loading state", () => {
    const tree = renderer.create(
      <ArticleListItem {...listItemProps} isLoading />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render an article list item without images", () => {
    const tree = renderer.create(
      <ArticleListItem {...listItemProps} leadAsset={{}} showImage={false} />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render the article list page error correctly", () => {
    const wrapper = shallow(<ArticleListPageError refetch={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render an article list", () => {
    const pageSize = 3;
    const results = pagedResult(0, pageSize);
    const articles = results.articles.list;
    const tree = renderer.create(
      <ArticleList
        {...articleListProps}
        articles={articles}
        count={articles.length}
        page={1}
        pageSize={pageSize}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render an article list that is loading", () => {
    const props = {
      ...articleListProps,
      articlesLoading: true,
      articles: Array(3)
        .fill()
        .map((number, id) => ({
          id,
          loading: true
        })),
      isLoading: true
    };

    const tree = renderer.create(<ArticleList {...props} />);

    expect(tree).toMatchSnapshot();
  });

  it("should retry getting the articles when clicking the retry button", () => {
    const refetchMock = jest.fn();
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={[]}
        count={0}
        error={new Error("Failed")}
        onViewed={() => {}}
        page={1}
        pageSize={3}
        refetch={refetchMock}
      />
    );

    wrapper
      .dive()
      .find("Button")
      .simulate("press");

    expect(refetchMock).toHaveBeenCalled();
  });
};
