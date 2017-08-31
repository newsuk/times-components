import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import BrightcoveVideo from "@times-components/brightcove-video";

class BrightcoveVideoLauncher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launched: false
    };
  }

  render() {
    if (this.state.launched) {
      return <BrightcoveVideo {...this.props} />;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ launched: true });
        }}
      >
        <Image
          source={{ uri: this.props.poster }}
          style={{ width: this.props.width, height: this.props.height }}
        />
      </TouchableWithoutFeedback>
    );
  }
}

BrightcoveVideoLauncher.propTypes = Object.assign(
  {
    poster: PropTypes.string
  },
  BrightcoveVideo.propTypes
);

BrightcoveVideoLauncher.defaultProps = Object.assign(
  {
    poster:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
  },
  BrightcoveVideo.defaultProps
);

BrightcoveVideoLauncher.defaultProps.autoplay = true;

export default BrightcoveVideoLauncher;
