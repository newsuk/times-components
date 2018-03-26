/* eslint-disable react/prefer-stateless-function, react/require-render-return */

import { Component } from "react";

class Erroring extends Component {
  render() {
    throw new Error("an error occurred");
  }
}

export default Erroring;
