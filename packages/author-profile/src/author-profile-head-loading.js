import React from "react";
import { TcView } from "@times-components/utils";
import Gradient from "@times-components/gradient";
import styles from "./styles";

const AuthorProfileHeadLoading = () => (
  <TcView style={styles.loadingContainer}>
    <TcView style={styles.loadingRoundImage}>
      <Gradient style={styles.loadingGradient} />
    </TcView>
  </TcView>
);

export default AuthorProfileHeadLoading;
