import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import BrightcoveVideo from "./brightcove-video";

class VideoAddTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCount: 0
    };
  }
  _getVideos(count) {
    const videos = [];
    let i = 0;

    while (i < count) {
      videos.push(
        <BrightcoveVideo
          key={i}
          width={300}
          height={200}
          policyId="BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm"
          videoId="3666678807001"
          accountId="3636334163001"
        />
      );

      i++;
    }

    return (
      <View>
        {videos}
      </View>
    );
  }
  render() {
    return (
      <View>
        {this._getVideos(this.state.videoCount)}
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 5,
            margin: 5
          }}
          onClick={() => {
            this.setState({ videoCount: this.state.videoCount + 1 });
          }}
        >
          <Text style={{ color: "white" }}>click here to add a video</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

storiesOf("BrightcoveVideo", module)
  .add("default", () =>
    <BrightcoveVideo
      policyId="BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm"
      videoId="5464373931001"
      accountId="5436121857001"
    />
  )
  .add("big", () =>
    <BrightcoveVideo
      width={300}
      height={200}
      policyId="BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm"
      videoId="3666678807001"
      accountId="3636334163001"
    />
  )
  .add("two videos", () =>
    <View>
      <BrightcoveVideo
        width={300}
        height={200}
        policyId="BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm"
        videoId="3666678807001"
        accountId="3636334163001"
      />
      <BrightcoveVideo
        width={320}
        height={200}
        policyId="BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm"
        videoId="3666678807001"
        accountId="3636334163001"
      />
    </View>
  )
  .add("click to add", () => <VideoAddTest />);
