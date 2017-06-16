import React, { Component } from "react";
import { requireNativeComponent } from 'react-native';

class BrightcoveVideo extends Component {
    render () {
        const height = this.props.height || '100%';
        const width = this.props.width || '100%';

        return (<RNTBrightcove
            style={{height, width}}
            policyId={this.props.policyId}
            accountId={this.props.accountId}
            videoId={this.props.videoId} />
        );
    }
}

const RNTBrightcove = requireNativeComponent('RNTBrightcove', null);

export default BrightcoveVideo;
