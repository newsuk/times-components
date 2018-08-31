import React from "react";
import renderer from "react-test-renderer";
import { NativeArticleProvider } from "../src/provider";

const renderComponent = (child, fetch) =>
  renderer.create(
    <NativeArticleProvider
      articleId="113e9875-b7bf-4dd7-ac99-dee231bf6e74"
      fetch={fetch}
    >
      {child}
    </NativeArticleProvider>
  );

describe("NativeArticleProvider", () => {
  it("returns query result", done => {
    const mockArticle = { article: { title: "Dummy Article" } };
    const fetch = jest.fn().mockReturnValue(Promise.resolve(mockArticle));

    renderComponent(({ data, isLoading }) => {
      if (!isLoading) {
        expect(data).toBe(mockArticle);
        done();
      }

      return null;
    }, fetch);
  });

  it("returns error", done => {
    const mockError = { error: "Dummy Error" };
    const fetch = jest.fn().mockReturnValue(Promise.reject(mockError));

    renderComponent(({ error, isLoading }) => {
      if (!isLoading) {
        expect(error).toBe(mockError);
        done();
      }

      return null;
    }, fetch);
  });
});
