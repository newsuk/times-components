package uk.co.news.rntbrightcovevideo;

import android.util.Log;

import com.brightcove.player.edge.Catalog;
import com.brightcove.player.edge.VideoListener;
import com.brightcove.player.event.Event;
import com.brightcove.player.event.EventEmitter;
import com.brightcove.player.event.EventListener;
import com.brightcove.player.event.EventType;
import com.brightcove.player.mediacontroller.BrightcoveMediaController;
import com.brightcove.player.model.Video;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

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

      eventEmitter.on(EventType.PLAY, new EventListener() {
        @Override
        public void processEvent(Event e) {
          WritableMap event = Arguments.createMap();
          event.putString("Event", "play");
          ReactContext reactContext = (ReactContext) getContext();
          reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);
        }
      });

      eventEmitter.on(EventType.PAUSE, new EventListener() {
        @Override
        public void processEvent(Event e) {
          WritableMap event = Arguments.createMap();
          event.putString("Event", "pause");
          ReactContext reactContext = (ReactContext) getContext();
          reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);
        }
      });

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
