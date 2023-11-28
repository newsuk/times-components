import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";

export const boxStyles = {
  box: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    height: 200,
    width: 200
  }
};

const Box = ({ children, color, id }) => (
  <div id={id}>
    <TcView style={{ ...boxStyles.box, backgroundColor: color }}>
      {children}
    </TcView>
  </div>
);
Box.propTypes = {
  children: PropTypes.element,
  color: PropTypes.string,
  id: PropTypes.string
};
Box.defaultProps = {
  children: null,
  color: "",
  id: ""
};

export default Box;
