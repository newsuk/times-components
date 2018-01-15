import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import ErrorView from "../error-view";
import InvokesError from "./invokes-error";
import ThrowsError from "./throws-error";

const ErrorState = ({ error }) => <Text>{error.toString()}</Text>;

ErrorState.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  }).isRequired
};

const GoodState = () => <Text>All good</Text>;

it("renders the error state if a component throws an error", () => {
  const tree = renderer
    .create(
      <ErrorView>
        {({ hasError, error }) =>
          hasError ? <ErrorState error={error} /> : <ThrowsError />
        }
      </ErrorView>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders the error state if a component invokes an error", () => {
  const tree = renderer
    .create(
      <ErrorView>
        {({ hasError, onError, error }) =>
          hasError ? (
            <ErrorState error={error} />
          ) : (
            <InvokesError onError={onError} />
          )
        }
      </ErrorView>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("does not render an error state if there is no error", () => {
  const tree = renderer
    .create(
      <ErrorView>
        {({ hasError, error }) =>
          hasError ? <ErrorState error={error} /> : <GoodState />
        }
      </ErrorView>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
