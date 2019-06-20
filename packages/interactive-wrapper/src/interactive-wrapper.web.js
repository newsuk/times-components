/* eslint-env browser */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import 'webcomponents.js-2'
// let webComponent


export default class InteractiveWrapper extends Component {
  constructor(props) {
    super(props);
    this.placeholder = React.createRef(null);

    this.state = {
      webComponentsPolyfill: false
    }
    
  }
  
  componentDidMount() {

    // if(!this.state.webComponentsPolyfill) {
    //  webcomponents = require("webcomponents.js-2")
      window.addEventListener('WebComponentsReady', (e) => {
        console.log(this)
         this.setState({ webComponentsPolyfill: true });
          // imports are loaded and elements have been registered
         console.log('Components are ready');

             
    const { attributes, element, source } = this.props;
    const placeholder = this.placeholder.current;
    const { parentNode } = placeholder;

    const newElement = document.createElement(element);
    const link = document.createElement("link");

    link.setAttribute("href", source);
    link.setAttribute("rel", "import");

    Object.keys(attributes).forEach(key =>
      newElement.setAttribute(key, attributes[key])
    );

    parentNode.replaceChild(newElement, placeholder);
    parentNode.insertBefore(link, newElement);

    delete this.placeholder.current;
       })
      // }

  
    
  }

  render() {
    return this.state.webComponentsPolyfill ? <div ref={this.placeholder} /> : <div> loading</div>
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
