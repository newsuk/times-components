import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import BrightcoveVideo from "./brightcove-video";

storiesOf('BrightcoveVideo', module)
  .add('default', () => <BrightcoveVideo
    policyId='BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm'
    videoId='3666678807001'
    accountId='3636334163001' />)
  .add('big', () => <BrightcoveVideo
    width={300}
    height={200}
    policyId='BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm'
    videoId='3666678807001'
    accountId='3636334163001' />)
  .add('two videos', () => <View>
    <BrightcoveVideo
      width={300}
      height={200}
      policyId='BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm'
      videoId='3666678807001'
      accountId='3636334163001' />
    <BrightcoveVideo
      width={320}
      height={200}
      policyId='BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm'
      videoId='3666678807001'
      accountId='3636334163001' />
  </View>);
