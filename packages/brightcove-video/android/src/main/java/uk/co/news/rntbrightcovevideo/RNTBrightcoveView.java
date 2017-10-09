package uk.co.news.rntbrightcovevideo;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.res.Configuration;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.ViewParent;
import android.widget.FrameLayout;

import com.brightcove.player.event.Event;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class RNTBrightcoveView extends FrameLayout {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private Boolean mAutoplay;
    private Boolean mHideFullScreenButton;
    private BrightcovePlayerView mPlayerView;
    private Context mContext;

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
        return mPlayerView.getIsPlaying();
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


            mPlayerView = new BrightcovePlayerView(getActivity());

            addView(mPlayerView);

            mPlayerView.setStartPlayheadPosition(mSavedPlayheadPosition);

            boolean isFullscreenButtonHidden = mHideFullScreenButton != null ? mHideFullScreenButton : false;
            mPlayerView.initVideo(mVideoId, mAccountId, mPolicyKey, mAutoplay, isFullscreenButtonHidden);
        }
    }

    private Activity getActivity() {
        Context context = getContext();
        while (context instanceof ContextWrapper) {
            if (context instanceof Activity) {
                return (Activity)context;
            }
            context = ((ContextWrapper)context).getBaseContext();
        }
        return null;
    }

    public void emitState(final Boolean isPlaying, final int progress) {
        WritableMap event = Arguments.createMap();

        if (isPlaying != null) {
            Integer duration = mPlayerView.getDuration();

            event.putBoolean("isPlaying", isPlaying);
            event.putDouble("progress", progress);

            if (duration > 0) {
                event.putDouble("duration", duration);
            }

            event.putBoolean("isFinished", duration == progress);
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
