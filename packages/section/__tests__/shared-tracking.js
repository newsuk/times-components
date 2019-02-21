import React, { Component } from "react";
import PropTypes from "prop-types";
import { MockEdition } from "@times-components/fixture-generator";
import Link from "@times-components/link";
import TestRenderer from "react-test-renderer";
import Section from "../src/section";

export default () => {
  it("section page tracking", () => {
    const edition = new MockEdition().get();

    const stream = jest.fn();

    class WithTrackingContext extends Component {
      getChildContext() {
        return {
          tracking: {
            analytics: stream
          }
        };
      }

      render() {
        return (
          <Section
            analyticsStream={() => {}}
            onPress={() => {}}
            section={edition.sections[0]}
          />
        );
      }
    }

    WithTrackingContext.childContextTypes = {
      tracking: PropTypes.shape({
        analytics: PropTypes.func
      })
    };

    const testInstance = TestRenderer.create(<WithTrackingContext />);

    const [link] = testInstance.root.findAllByType(Link);

    link.props.onPress();

    const [[call]] = stream.mock.calls;

    expect(call).toMatchSnapshot();
  });
};
