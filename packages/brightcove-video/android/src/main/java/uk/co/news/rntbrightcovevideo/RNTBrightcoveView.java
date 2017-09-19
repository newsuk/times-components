package uk.co.news.rntbrightcovevideo;

import android.content.res.Configuration;
import android.graphics.Color;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.brightcove.player.event.Event;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class RNTBrightcoveView extends RelativeLayout {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private Boolean mAutoplay;
    private Boolean mHideFullScreenButton;
    private BrightcovePlayerView mPlayerView;
    private ThemedReactContext mContext;

    private float mSavedPlayheadPosition = 0;

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);
        mContext = context;
        this.setBackgroundColor(Color.BLACK);
    }

    @Override
    protected void onConfigurationChanged(Configuration newConfig) {
        Log.d(TAG, "onConfigurationChanged");

        mAutoplay = isPlaying();
        mSavedPlayheadPosition = mPlayerView.getPlayheadPosition();

        removeAllViews();

        initPlayerView();

        super.onConfigurationChanged(newConfig);
    }

    private boolean isPlaying() {
        return mPlayerView.getPlayerStatus() == "playing";
    }

    public void play() {
        mPlayerView.start();
    }

    public void pause() {
        mPlayerView.pause();
    }

    public void setVideoId(final String videoId) {
        if (mVideoId == null) {
            mVideoId = videoId;
            initPlayerView();
        }
    }

    public void setAccountId(final String accountId) {
        if (mAccountId == null) {
            mAccountId = accountId;
            initPlayerView();
        }
    }

    public void setPolicyKey(final String policyKey) {
        if (mPolicyKey == null) {
            mPolicyKey = policyKey;
            initPlayerView();
        }
    }

    public void setAutoplay(final Boolean autoplay) {
        if (mAutoplay == null) {
            mAutoplay = autoplay;
            initPlayerView();
        }
    }

    public void setHideFullScreenButton(final Boolean hideFullScreenButton) {
        if (mHideFullScreenButton == null) {
            mHideFullScreenButton = hideFullScreenButton;
            initPlayerView();
        }
    }

    private void initPlayerView() {
        if (parametersSet()) {
            Log.d(TAG, "adding player view");

            mPlayerView = new BrightcovePlayerView(mContext);

            addView(mPlayerView, new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

            mPlayerView.setStartPlayheadPosition(mSavedPlayheadPosition);

            boolean isFullscreenButtonHidden = mHideFullScreenButton != null ? mHideFullScreenButton : false;

            mPlayerView.initVideo(mVideoId, mAccountId, mPolicyKey, mAutoplay, isFullscreenButtonHidden);
        }
    }

    public void emitState(final String playerStatus, final Float playheadPosition) {
        WritableMap event = Arguments.createMap();

        //String playerStatus = mPlayerView.getPlayerStatus();

        if (playerStatus != null) {
            event.putString("playerStatus", playerStatus);
            //event.putString("playheadPosition", Float.toString(mPlayerView.getPlayheadPosition() / 1000));
            event.putDouble("playheadPosition", playheadPosition);
            ReactContext reactContext = (ReactContext) getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);
        }
    }

    public void emitError(Event e) {
        WritableMap event = Arguments.createMap();
        event.putString("code", e.properties.get("error_code").toString());
        event.putString("message", e.toString());
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topLoadingError", event);
    }

    private boolean parametersSet() {
        return mVideoId != null && mAccountId != null && mPolicyKey != null && mAutoplay != null && mHideFullScreenButton != null;
    }
}
