import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Script from "react-load-script";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EFEB"
  },
  outerContainer: {
    display: "block",
    position: "relative",
    maxWidth: "100%"
  },
  innerContainer: {
    paddingTop: "56.25%"
  }
});

class Brightcove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });

    this.mountVideoPlayer();
  }

  mountVideoPlayer() {
    this._player = videojs(this.getVideoElementId());
  }

  getVideoPlayer() {
    return this._player;
  }

  getVideoElementId() {
    return `${this.props.video_id}-${this.props.account_id}`;
  }

  pauseVideo() {
    this._player.pause();
  }

  playVideo() {
    this._player.play();
  }

  restartVideo() {
    this._player.currentTime(0).play();
  }

  render() {
    const scriptUrl = `//players.brightcove.net/${this.props.account_id}/${this
      .props.player_id}_default/index.min.js`;

    const attribs = {
      id: this.getVideoElementId(),
      "data-embed": "default",
      "data-video-id": this.props.video_id,
      "data-account": this.props.account_id,
      "data-player": this.props.player_id,
      className: "video-js"
    };

    if (this.props.height) {
      height = this.props.height + "px";
    }

    if (this.props.width) {
      width = this.props.width + "px";
    }

    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <video
            style={{
              width: this.props.width,
              height: this.props.height,
              position: "absolute",
              top: "0",
              left: "0"
            }}
            {...attribs}
            data-application-id
            controls
          />
          <Script url={scriptUrl} onLoad={this.handleScriptLoad.bind(this)} />
        </View>
      </View>
    );
  }
}

Brightcove.defaultProps = {
  account_id: "5436121857001",
  video_id: "5464373931001",
  player_id: "default",
  paidOnly: false,
  width: 800,
  height: 450
};

Brightcove.propTypes = {
  account_id: PropTypes.string.isRequired,
  video_id: PropTypes.string.isRequired,
  player_id: PropTypes.string,
  paidOnly: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Brightcove;
