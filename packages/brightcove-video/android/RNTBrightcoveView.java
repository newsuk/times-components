package com.tnluicomponents;

import android.util.Log;

import com.brightcove.player.edge.Catalog;
import com.brightcove.player.edge.VideoListener;
import com.brightcove.player.event.EventEmitter;
import com.brightcove.player.mediacontroller.BrightcoveMediaController;
import com.brightcove.player.model.Video;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNTBrightcoveView extends BrightcoveExoPlayerVideoView {
  private String mVideoId, mAccountId, mPolicyId;

  public RNTBrightcoveView(ThemedReactContext context) {
    super(context, null);
    finishInitialization();
  }

  public void setVideoId(String videoId) {
    mVideoId = videoId;
    initVideo();
  }

  public void setAccountId(String accountId) {
    mAccountId = accountId;
    initVideo();
  }

  public void setPolicyId(String policyId) {
    mPolicyId = policyId;
    initVideo();
  }

  private void initVideo() {
    if (mVideoId != null && mAccountId != null && mPolicyId != null) {
      EventEmitter eventEmitter = getEventEmitter();

      Catalog catalog = new Catalog(eventEmitter, mAccountId, mPolicyId);

      this.setMediaController(new BrightcoveMediaController(this));

      catalog.findVideoByID(mVideoId, new VideoListener() {
        @Override
        public void onVideo(Video video) {
          RNTBrightcoveView.this.add(video);
          RNTBrightcoveView.this.start();
        }
      });
    }
  }
}
