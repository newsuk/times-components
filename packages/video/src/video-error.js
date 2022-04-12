import React from "react";
import PropTypes from "prop-types";
import {
  VideoErrorContainer,
  VideoErrorHeading,
  VideoErrorBody
} from "./styles";

const VideoError = ({ height, width }) => (
  <VideoErrorContainer
    style={{
      height,
      width
    }}
  >
    <VideoErrorHeading>Video unable to play</VideoErrorHeading>
    <VideoErrorBody>
      Please check your network connection and try refreshing the page. If that
      doesn&apos;t work, please try again later
    </VideoErrorBody>
  </VideoErrorContainer>
);

VideoError.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
