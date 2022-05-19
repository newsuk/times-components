import React from "react";
import { TcView, TcText } from "@times-components/utils";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import Context from "@times-components/context";
import { styleguide } from "@times-components/ts-styleguide";
import styles from "./styles";

const ArticleExtrasError = ({ refetch }) => (
  <TcView style={styles.extrasErrorContainer}>
    <TcText style={styles.extrasErrorHeadline}>
      It looks like you&apos;re offline
    </TcText>
    <TcText style={styles.extrasErrorBody}>
      Some features, such as related articles and comments, may not be available
    </TcText>
    <Context.Consumer>
      {({ theme: { scale } }) => {
        const themedStyleguide = styleguide({ scale });
        const fontFactory = themedStyleguide.fontFactory({
          font: "supporting",
          fontSize: "button"
        });
        return (
          <Button
            fontSize={fontFactory.fontSize}
            lineHeight={fontFactory.lineHeight}
            onPress={refetch}
            style={styles.extrasErrorButton}
            title="Retry"
          />
        );
      }}
    </Context.Consumer>
  </TcView>
);

ArticleExtrasError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default ArticleExtrasError;
