import React, { Component } from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import gql from "graphql-tag";
import { MockedProvider } from "@times-components/provider-test-tools";
import connectGraphql from "../src/provider";

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

const constructComponent = (child, customMocks, debounceTimeMs = 0) => {
  const ConnectedComponent = connectGraphql(query);
  return (
    <MockedProvider mocks={customMocks || mocks} removeTypename>
      <ConnectedComponent
        config1="c1"
        config2="c2"
        debounceTimeMs={debounceTimeMs}
      >
        {child}
      </ConnectedComponent>
    </MockedProvider>
  );
};

const renderComponent = (child, customMocks) =>
  renderer.create(constructComponent(child, customMocks));

describe("Provider Tests", () => {
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
        error: {
          message: "some error from the server"
        },
        request: {
          query
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
        error: {
          message: "some error from the server"
        },
        request: {
          query
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
        error: {
          message: "some error from the server"
        },
        request: {
          query
        }
      },
      {
        error: {
          message: "some error from the server"
        },
        request: {
          query
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

  it("complains if you omit the debounceTimeMs parameter to a connected component", done => {
    const ConnectedComponent = connectGraphql(query);

    jest.spyOn(console, "error").mockImplementation(() => {});

    class ErrorSpy extends Component {
      /* eslint class-methods-use-this: "off" */
      componentDidCatch(e) {
        expect(e.message).toEqual("debounceTimeMs prop required");
        done();
      }

      render() {
        const { children } = this.props;

        return children;
      }
    }
    ErrorSpy.propTypes = {
      children: PropTypes.node.isRequired
    };

    renderer.create(
      <MockedProvider mocks={[]} removeTypename>
        <ErrorSpy>
          <ConnectedComponent />
        </ErrorSpy>
      </MockedProvider>
    );
  });
});
