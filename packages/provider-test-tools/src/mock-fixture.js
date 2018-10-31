import { Component } from "react";
import PropTypes from "prop-types";
import schema from "@times-components/schema/schema.json";
import { graphql } from "graphql";
import { print } from "graphql/language/printer";
import mm from "./make-mocks";

const makeMocks = mm(schema);

const makeQuery = ({ defaults, delay, error, query, variables }) =>
  graphql(makeMocks(defaults), print(query), null, null, variables).then(
    mock => ({
      defaults,
      delay,
      error,
      mock,
      query,
      variables
    })
  );

const toResponse = ({ delay, error, mock, query, variables }) => ({
  delay,
  error,
  request: {
    query,
    variables
  },
  result: mock
});

export const schemaToMocks = params =>
  Promise.all(params.map(makeQuery)).then(([...mocks]) =>
    mocks.map(toResponse)
  );

class MockFixture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mocks: []
    };
  }

  componentDidMount() {
    schemaToMocks(this.props.params).then(mocks => this.setState({ mocks }));
  }

  render() {
    return this.state.mocks.length === 0
      ? null
      : this.props.render(this.state.mocks);
  }
}

MockFixture.propTypes = {
  params: PropTypes.arrayOf(
    PropTypes.shape({
      defaults: PropTypes.shape({
        types: PropTypes.any,
        values: PropTypes.any
      }),
      delay: null,
      query: PropTypes.object.isRequired,
      variables: PropTypes.object
    })
  ).isRequired,
  render: PropTypes.func.isRequired
};

export default MockFixture;
