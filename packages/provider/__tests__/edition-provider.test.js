import React from "react";
import renderer from "react-test-renderer";
import {
  edition as makeEditionParams,
  MockedProvider,
  MockFixture
} from "@times-components/provider-test-tools";
import { EditionProvider } from "../src/provider";

const renderComponent = child => {
  const id = "2b6e462c-225f-11e9-b782-40e94f317da5";

  return renderer.create(
    <MockFixture
      params={makeEditionParams({
        variables: () => ({
          id
        })
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <EditionProvider debounceTimeMs={0} id={id}>
            {child}
          </EditionProvider>
        </MockedProvider>
      )}
    />
  );
};

describe("Edition provider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, edition }) => {
      if (!isLoading) {
        expect(edition).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
