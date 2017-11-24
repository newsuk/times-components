import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Box from "./box";

export default class Boxes extends React.Component {
  componentDidMount() {
    this.props.receiveChildList(this.props.boxes);
  }
  render() {
    return this.props.boxes.map(item => (
      <Box key={item.id} {...item}>
        <Text>{item.id}</Text>
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
