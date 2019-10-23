import React from "react";
import styles from "./styles";

export default {
  bold(key, attributes, renderedChildren) {
    return (
      <b key={key} style={styles.bold}>
        {renderedChildren}
      </b>
    );
  }
};
