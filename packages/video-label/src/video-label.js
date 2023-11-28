import React from "react";
import { checkStylesForUnits, TcText, TcView } from "@times-components/utils";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "./style";

const VideoLabelText = styled(TcText)`
  ${checkStylesForUnits(styles.title)};
`;

const Container = styled(TcView)`
  ${checkStylesForUnits(styles.container)};
`;

const IconContainer = styled(TcView)`
  ${checkStylesForUnits(styles.iconContainer)};
`;

const VideoLabel = ({ color, title }) => {
  const textStyles = {
    ...styles.title
  };

  Object.assign(textStyles, { color });

  return (
    <Container>
      <IconContainer>
        <IconVideo fillColour={color} height={9} />
      </IconContainer>
      <VideoLabelText style={textStyles}>
        {title ? title.toUpperCase() : "VIDEO"}
      </VideoLabelText>
    </Container>
  );
};

VideoLabel.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black",
  title: ""
};

export default VideoLabel;
