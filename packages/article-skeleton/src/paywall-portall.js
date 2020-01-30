import React, { Component } from "react";
import PropTypes from "prop-types";
import get from "lodash.get";

class PaywallPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentToRender: ""
    };
  }

  componentDidMount() {
    const { componentName } = this.props;
    const componentToRender = get(window, `paywallComponent.${componentName}`);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ componentToRender });
  }

  render() {
    const { id } = this.props;
    const { componentToRender } = this.state;
    return (
      <div id={id} dangerouslySetInnerHTML={{ __html: componentToRender }} />
    );
  }
}

PaywallPortal.propTypes = {
  id: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired
};

export default PaywallPortal;
