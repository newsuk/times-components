package uk.co.news.rntbrightcovevideo;

import android.support.annotation.NonNull;

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

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private String mPlayerStatus;
    private Boolean mAutoplay;

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);
        finishInitialization();
    }

    public void setVideoId(final String videoId) {
        mVideoId = videoId;
        initVideo();
    }

    public void setAccountId(final String accountId) {
        mAccountId = accountId;
        initVideo();
    }

    public void setPolicyKey(final String policyKey) {
        mPolicyKey = policyKey;
        initVideo();
    }

    public void setAutoplay(final Boolean autoplay) {
        mAutoplay = autoplay;
        initVideo();
    }

    private void emitState() {
        WritableMap event = Arguments.createMap();
        event.putString("playerStatus", mPlayerStatus);
        event.putString("playheadPosition", Float.toString((float) playheadPosition / 1000));
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);
    }

    private void emitError(Event e) {
        WritableMap event = Arguments.createMap();
        event.putString("code", e.properties.get("error_code").toString());
        event.putString("message", e.toString());
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topLoadingError", event);
    }

    private EventEmitter setupEventEmitter() {
        EventEmitter eventEmitter = getEventEmitter();
        eventEmitter.on(EventType.PLAY, onEvent("playing"));
        eventEmitter.on(EventType.PAUSE, onEvent("paused"));
        eventEmitter.on(EventType.SEEK_TO, new EventListener() {
            @Override
            public void processEvent(Event e) {
                emitState();
            }
        });
        eventEmitter.on(EventType.ERROR, new EventListener() {
            @Override
            public void processEvent(Event e) {
                emitError(e);
            }
        });
        return eventEmitter;
    }

    private void initVideo() {
        if (parametersSet()) {
            EventEmitter eventEmitter = setupEventEmitter();
            Catalog catalog = new Catalog(eventEmitter, mAccountId, mPolicyKey);

            catalog.findVideoByID(mVideoId, createVideoListener());

            this.setMediaController(new BrightcoveMediaController(this));
        }
    }

    @NonNull
    private VideoListener createVideoListener() {
        return new VideoListener() {
            @Override
            public void onVideo(Video video) {
                RNTBrightcoveView.this.add(video);

                if (mAutoplay) {
                    RNTBrightcoveView.this.start();
                }
            }
        };
    }

    private EventListener onEvent(final String playerStatus) {
        return new EventListener() {
            @Override
            public void processEvent(Event event) {
                mPlayerStatus = playerStatus;
                emitState();
            }
        };
    }

    private boolean parametersSet() {
        return mVideoId != null && mAccountId != null && mPolicyKey != null && mAutoplay != null;
    }
}
