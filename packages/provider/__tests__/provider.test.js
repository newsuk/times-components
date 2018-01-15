/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import gql from "graphql-tag";
import { MockedProvider } from "@times-components/utils/graphql";
import connectGraphql from "../provider";

const query = gql`
  {
    author(slug: "fiona-hamilton") {
      name
    }
  }
`;

const mocks = [
  {
    request: {
      query
    },
    result: {
      data: {
        author: {
          name: "fiona-hamilton"
        }
      }
    }
  }
];

const ConnectedComponent = connectGraphql(query);

const renderComponent = (child, customMocks) =>
  renderer.create(
    <MockedProvider mocks={customMocks || mocks} removeTypename>
      <ConnectedComponent config1="c1" config2="c2">
        {child}
      </ConnectedComponent>
    </MockedProvider>
  );

it("returns query result", done => {
  renderComponent(({ isLoading, author }) => {
    if (!isLoading) {
      expect(author).toMatchSnapshot();
      done();
    }

    return null;
  });
});

it("returns loading state with no author", done => {
  renderComponent(({ isLoading, author }) => {
    if (isLoading) {
      expect(author).toMatchSnapshot();
      done();
    }

    return null;
  });
});

it("returns config data", done => {
  renderComponent(({ isLoading, config1, config2 }) => {
    if (!isLoading) {
      expect({ config1, config2 }).toMatchSnapshot();
      done();
    }

    return null;
  });
});

it("returns an error", done => {
  const customMocks = [
    {
      request: {
        query
      },
      error: {
        message: "some error from the server"
      }
    }
  ];

  renderComponent(({ isLoading, error }) => {
    if (!isLoading) {
      expect(error).toMatchSnapshot();
      done();
    }

    return null;
  }, customMocks);
});

it("re-renders with refetched data after error", done => {
  const customMocks = [
    {
      request: {
        query
      },
      error: {
        message: "some error from the server"
      }
    },
    {
      request: {
        query
      },
      result: {
        data: {
          author: {
            name: "fiona-hamilton"
          }
        }
      }
    }
  ];

  renderComponent(({ isLoading, refetch, error, author }) => {
    if (!isLoading) {
      if (error) {
        setTimeout(refetch);
        return null;
      }

      expect(author).toMatchSnapshot();
      done();
    }

    return null;
  }, customMocks);
});

it("supports another refetch after error during refetch", done => {
  const customMocks = [
    {
      request: {
        query
      },
      error: {
        message: "some error from the server"
      }
    },
    {
      request: {
        query
      },
      error: {
        message: "some error from the server"
      }
    },
    {
      request: {
        query
      },
      result: {
        data: {
          author: {
            name: "fiona-hamilton"
          }
        }
      }
    }
  ];

  let errorCount = 0;

  renderComponent(({ isLoading, refetch, error, author }) => {
    if (!isLoading) {
      if (error) {
        errorCount += 1;
        setTimeout(refetch);

        return null;
      }

      expect(errorCount).toEqual(2);
      expect(author).toMatchSnapshot();
      done();
    }

    return null;
  }, customMocks);
});
