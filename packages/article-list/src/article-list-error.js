import React, { Fragment } from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import styles from "./styles";

const ArticleListError = () => (
  <Fragment>
    <TcText style={checkStylesForUnits(styles.listErrorHeading)}>
      Something&apos;s gone wrong
    </TcText>
    <TcText style={checkStylesForUnits(styles.listErrorMessage)}>
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </TcText>
  </Fragment>
);

export default ArticleListError;
