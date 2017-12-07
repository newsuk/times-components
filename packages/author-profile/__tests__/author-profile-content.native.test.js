/* eslint-env jest */

import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import authorProfileFixture from "../fixtures/author-profile.json";
import pagedResult from "./paged-result";
import test from "./author-profile-helper";
import AuthorProfileContent from "../author-profile-content.js";

Enzyme.configure({ adapter: new React16Adapter() });

it("emits scroll tracking events for author profile content", () => {
  const reporter = jest.fn();
  const results = pagedResult(0, 3);
  const authorProfileContent = shallow(
    <AuthorProfileContent
      count={10}
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="deborah-haynes"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />,
    {
      context: {
        tracking: {
          analytics: reporter
        }
      }
    }
  );
  authorProfileContent
    .dive()
    .instance()
    .onViewableItemsChanged.call(authorProfileContent.instance(), {
      changed: [
        {
          isViewable: true,
          item: {
            elementId: "articleList-1-2"
          }
        }
      ]
    });

  expect(reporter).toHaveBeenCalledWith(
    expect.objectContaining({
      attrs: expect.objectContaining({
        scrollDepth: {
          itemNumber: 3,
          total: 3
        }
      })
    })
  );
});

test(AuthorProfileContent);
