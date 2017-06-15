import React, { Component } from 'react';

class Brightcove extends Component {
  componentDidMount () {
    // add and execute the player script tag
    const s = document.createElement('script');
    s.src = '//players.brightcove.net/' + this.props.accountId + '/' + (this.props.playerId || 'default') + '_default/index.min.js';
    document.body.appendChild(s);
  }

  render () {
    let height = '100px';
    let width = '150px';

    if (this.props.height) {
      height = this.props.height + 'px';
    }

    if (this.props.width) {
      width = this.props.width + 'px';
    }

    return (
      <video
        style={{ height: height, width: width }}
        data-video-id={this.props.videoId}
        data-account={this.props.accountId}
        data-player={this.props.playerId || 'default'}
        data-embed='default'
        data-application-id
        className='video-js'
        controls />
    );
  }
}

export default Brightcove;
