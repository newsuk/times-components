/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";

export default class InteractiveWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.div = React.createRef(null);
  }

  componentDidMount() {
    const div = this.div.current;
    const parent = div.parentNode;
    const element = document.createElement(this.props.element);
    const link = document.createElement('link');

    link.setAttribute('href', this.props.source);
    link.setAttribute('rel', 'import');

    Object.entries(this.props.attributes).forEach(
      ([key, value]) => element.setAttribute(key, value)
    );

    parent.appendChild(element);
    parent.appendChild(link);
    parent.removeChild(div);
  }

  render() {
    return <div ref={this.div} />;
  }
}

InteractiveWrapper.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};
InteractiveWrapper.defaultProps = {
  attributes: {}
};
