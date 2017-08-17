package uk.co.news.rntbrightcovevideo;

import android.support.annotation.NonNull;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;

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
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private String mPlayerStatus;
    private Boolean mAutoplay;
    private Boolean mHideFullScreenButton;

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);
        finishInitialization();

        BrightcoveMediaController mc = new BrightcoveMediaController(this);
        this.setMediaController(mc);
    }

    public void setVideoId(final String videoId) {
        if (mVideoId == null) {
            mVideoId = videoId;
            initVideo();
        }
    }

    public void setAccountId(final String accountId) {
        if (mAccountId == null) {
            mAccountId = accountId;
            initVideo();
        }
    }

    public void setPolicyKey(final String policyKey) {
        if (mPolicyKey == null) {
            mPolicyKey = policyKey;
            initVideo();
        }
    }

    public void setAutoplay(final Boolean autoplay) {
        if (mAutoplay == null) {
            mAutoplay = autoplay;
            initVideo();
        }
    }

    public void setHideFullScreenButton(final Boolean hideFullScreenButton) {
        if (mHideFullScreenButton == null) {
            mHideFullScreenButton = hideFullScreenButton;
            initVideo();
        }
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
        eventEmitter.on(EventType.VIDEO_SIZE_KNOWN, new EventListener() {
            @Override
            public void processEvent(Event e) {
                fixVideoLayout();
            }
        });
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
            if (mHideFullScreenButton) {
                View fullScreenButton = this.findViewById(com.brightcove.player.R.id.full_screen);
                fullScreenButton.setVisibility(View.GONE);
            }

            EventEmitter eventEmitter = setupEventEmitter();

            Catalog catalog = new Catalog(eventEmitter, mAccountId, mPolicyKey);
            catalog.findVideoByID(mVideoId, createVideoListener());
        }
    }

    private void fixVideoLayout() {
        Log.d(TAG, "fixVideoLayout");

        final int viewW = this.getMeasuredWidth();
        final int viewH = this.getMeasuredHeight();

        SurfaceView surfaceView = (SurfaceView)this.getRenderView();

        surfaceView.measure(viewW, viewH);

        final int surfaceW = surfaceView.getMeasuredWidth();
        final int surfaceH = surfaceView.getMeasuredHeight();

        final int leftOffset = (viewW - surfaceW) / 2;
        final int topOffset = (viewH - surfaceH) / 2;

        surfaceView.layout(
                leftOffset,
                topOffset,
                leftOffset + surfaceW,
                topOffset + surfaceH);
    }

    @NonNull
    private VideoListener createVideoListener() {
        return new VideoListener() {
            @Override
            public void onVideo(final Video video) {
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
        return mVideoId != null && mAccountId != null && mPolicyKey != null && mAutoplay != null && mHideFullScreenButton != null;
    }
}
