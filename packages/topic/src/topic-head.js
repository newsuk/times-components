import React, { Fragment } from "react";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import renderTrees from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import {
  HeadContainer,
  HeadContainerWithDescription,
  ResponsiveDivider,
  ResponsiveName
} from "./styles/responsive";
import styles from "./styles";

const TopicHead = ({ name, description, isLoading }) => {
  const Container =
    description && description.length
      ? HeadContainerWithDescription
      : HeadContainer;

  const showDescription = () =>
    description && description.length > 0 ? (
      <Fragment>
        <ResponsiveDivider />
        <TcText
          style={checkStylesForUnits({ ...styles.description })}
          data-testid="topic-description"
        >
          {renderTrees(description, coreRenderers)}
        </TcText>
      </Fragment>
    ) : null;

  return isLoading ? (
    <TcView style={styles.wrapper} />
  ) : (
    <TcView style={styles.wrapper}>
      <Container>
        <ResponsiveName accessibilityRole="header" testID="topic-name">
          {name}
        </ResponsiveName>
        {showDescription()}
      </Container>
    </TcView>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
