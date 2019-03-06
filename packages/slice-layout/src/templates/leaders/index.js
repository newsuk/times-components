import React from "react";
import styles from "./styles";
import Column from "../column";
import propTypes from "./proptypes";

const Leaders = ({ renderLeader1, renderLeader2, renderLeader3 }) => (
  <Column
    style={styles.container}
    tiles={[renderLeader1, renderLeader2, renderLeader3]}
  />
);

Leaders.propTypes = propTypes;

export default Leaders;
