import React from "react";
import renderer from "react-test-renderer";
import { nativeEdition } from "@times-components/provider-queries";
import {
  nativeEdition as makeNativeEditionParams,
  MockedProvider,
  MockFixture
} from "@times-components/provider-test-tools";
import connectGraphql from "../src/connect";

const NativeEditionProvider = connectGraphql(nativeEdition);

const renderComponent = child => {
  const id = "2b6e462c-225f-11e9-b782-40e94f317da5";

  return renderer.create(
    <MockFixture
      params={makeNativeEditionParams({
        variables: () => ({
          id
        })
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <NativeEditionProvider debounceTimeMs={0} id={id}>
            {child}
          </NativeEditionProvider>
        </MockedProvider>
      )}
    />
  );
};

describe("Native Edition provider", () => {
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
