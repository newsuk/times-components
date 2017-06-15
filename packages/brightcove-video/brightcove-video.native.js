import React, { Component } from "react";
import { requireNativeComponent } from 'react-native';

class BrightcoveVideo extends Component {
    render () {
        const height = this.props.height || '100%';
        const width = this.props.width || '100%';

        return (<RNTBrightcove
            style={{height, width}}
            policyId='BCpkADawqM1W-vUOMe6RSA3pA6Vw-VWUNn5rL0lzQabvrI63-VjS93gVUugDlmBpHIxP16X8TSe5LSKM415UHeMBmxl7pqcwVY_AZ4yKFwIpZPvXE34TpXEYYcmulxJQAOvHbv2dpfq-S_cm'
            accountId={this.props.accountId}
            videoId={this.props.videoId} />
        );
    }
}

const RNTBrightcove = requireNativeComponent('RNTBrightcove', null);

export default BrightcoveVideo;
