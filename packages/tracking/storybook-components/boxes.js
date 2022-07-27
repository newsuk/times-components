import React, { Component } from "react";
import PropTypes from "prop-types";
import { TcText } from "@times-components/utils";
import Box from "./box";

export default class Boxes extends Component {
  componentDidMount() {
    const { boxes, receiveChildList } = this.props;
    receiveChildList(boxes);
  }

  render() {
    const { boxes } = this.props;
    return boxes.map(item => (
      <Box id={item.elementId} key={item.elementId} {...item}>
        <TcText>{item.elementId}</TcText>
      </Box>
    ));
  }
}
Boxes.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  receiveChildList: PropTypes.func
};
Boxes.defaultProps = {
  receiveChildList: () => {}
};
