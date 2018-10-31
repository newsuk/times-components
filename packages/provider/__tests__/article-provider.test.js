import React from "react";
import renderer from "react-test-renderer";
import {
  article as makeParams,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import { ArticleProvider } from "../src/provider";

const renderComponent = (mocks, id, child) =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <ArticleProvider debounceTimeMs={0} id={id}>
        {child}
      </ArticleProvider>
    </MockedProvider>
  );

describe("ArticleProvider", () => {
  it("returns query result", done => {
    const id = "113e9875-b7bf-4dd7-ac99-dee231bf6e74";

    schemaToMocks(
      makeParams({
        makeArticle: article => ({
          ...article,
          content: [
            {
              children: [
                {
                  attributes: {
                    value: "test"
                  },
                  name: "text"
                }
              ],
              name: "paragraph"
            }
          ],
          relatedArticleSlice: {
            __typename: "StandardSlice",
            items: [article.relatedArticleSlice.items[0]]
          }
        }),
        relatedArticleCount: 1,
        variables: () => ({
          id
        })
      })
    ).then(mocks =>
      renderComponent(mocks, id, ({ article, isLoading }) => {
        if (!isLoading) {
          expect(article).toMatchSnapshot();
          done();
        }

        return null;
      })
    );
  });
});
