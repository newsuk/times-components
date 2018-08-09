import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import PropTypes from "prop-types";
import { iterator } from "@times-components/test-utils";
import ErrorView from "../src/error-view";
import InvokesError from "./invokes-error";
import ThrowsError from "./throws-error";

export default () => {
  const ErrorState = ({ error }) => <Text>{error.toString()}</Text>;

  ErrorState.propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string,
      stack: PropTypes.string
    }).isRequired
  };

  const GoodState = () => <Text>All good</Text>;

  const tests = [
    {
      name: "error state if a component throws an error",
      test() {
        const testInstance = TestRenderer.create(
          <ErrorView>
            {({ hasError, error }) =>
              hasError ? <ErrorState error={error} /> : <ThrowsError />
            }
          </ErrorView>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "error state if a component invokes an error",
      test() {
        const testInstance = TestRenderer.create(
          <ErrorView>
            {({ hasError, onError, error }) =>
              hasError ? (
                <ErrorState error={error} />
              ) : (
                <InvokesError onError={onError} />
              )
            }
          </ErrorView>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "good state if there is no error",
      test() {
        const testInstance = TestRenderer.create(
          <ErrorView>
            {({ hasError, error }) =>
              hasError ? <ErrorState error={error} /> : <GoodState />
            }
          </ErrorView>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
