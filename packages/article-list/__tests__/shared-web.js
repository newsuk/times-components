import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ArticleListPagination from "../src/article-list-pagination";
import ArticleList from "./../src/article-list";
import ArticleListItem from "./../src/article-list-item";
import articleListProps from "./default-article-list-props";
import pagedResult from "./paged-result";

const adConfig = {
  networkId: "mockNetwork",
  adUnit: "mockAdUnit",
  pageTargeting: {
    title: "Title"
  },
  slotTargeting: {
    path: "/news"
  },
  biddersConfig: {
    timeout: 3000,
    minPrice: 0.01,
    maxBid: 15,
    bucketSize: 0.25,
    bidders: {
      appnexus: {
        placementId: "5823281"
      },
      rubicon: {
        accountId: "14062",
        siteId: "70608",
        zoneId: "335918"
      },
      amazon: {
        accountId: "3360"
      },
      criteo: {
        zoneMap: {
          "120x600": "764877"
        }
      },
      pubmatic: {
        accountId: "156034",
        adSlotPrefix: "Thetimes"
      },
      indexExchange: {
        siteId: "188830"
      }
    }
  },
  bidderSlots: ["ad-header", "ad-article-inline"]
};

export default () => {
  it("should render the article list pagination correctly", () => {
    const tree = renderer.create(
      <ArticleListPagination count={20} page={1} pageSize={10} />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should handle the link to an article from an article list", () => {
    const onArticlePressMock = jest.fn();
    const pageSize = 3;
    const results = pagedResult(0, pageSize);
    const wrapper = mount(
      <ArticleList
        {...articleListProps}
        adConfig={adConfig}
        articles={results.articles.list}
        onArticlePress={onArticlePressMock}
        page={1}
        pageSize={pageSize}
      />
    );

    wrapper
      .find(ArticleListItem)
      .at(0)
      .find("Link")
      .props()
      .onPress();

    expect(onArticlePressMock).toHaveBeenCalled();
  });

  it("should show an advert after the fifth article", () => {
    const pageSize = 6;
    const results = pagedResult(0, pageSize);
    const tree = renderer.create(
      <ArticleList
        {...articleListProps}
        adConfig={adConfig}
        articles={results.articles.list}
        page={1}
        pageSize={pageSize}
      />
    );

    expect(tree).toMatchSnapshot();
  });
};
