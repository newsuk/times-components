package uk.co.news.rntbrightcovevideo;

import android.content.res.Configuration;
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
    private BrightcovePlayerView mPlayerView;
    private ThemedReactContext mContext;

    private float mSavedPlayheadPosition;
    private String mSavedPlayerStatus;

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);
        mContext = context;
        this.setBackgroundColor(0xFF000000);
    }

    @Override
    protected void onConfigurationChanged(Configuration newConfig) {
        Log.d(TAG, "onConfigurationChanged");

        mSavedPlayerStatus = mPlayerView.getPlayerStatus();
        mSavedPlayheadPosition = mPlayerView.getPlayheadPosition();

        this.removeAllViews();

        initPlayerView();

        super.onConfigurationChanged(newConfig);
    }

    public BrightcovePlayerView getPlayerView() {
        return mPlayerView;
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

    private void initPlayerView() {
        if (parametersSet()) {
            Log.d(TAG, "adding player view");

            mPlayerView = new BrightcovePlayerView(mContext);

            RNTBrightcoveView.this.addView(mPlayerView, new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

            mPlayerView.initVideo(mVideoId, mAccountId, mPolicyKey, mAutoplay);

            requestLayout();
            invalidate();
        }
    }

    public void emitState() {
        WritableMap event = Arguments.createMap();
        event.putString("playerStatus", mPlayerView.getPlayerStatus());
        event.putString("playheadPosition", Float.toString(mPlayerView.getPlayheadPosition() / 1000));

        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);
    }

    public void emitError(Event e) {
        WritableMap event = Arguments.createMap();
        event.putString("code", e.properties.get("error_code").toString());
        event.putString("message", e.toString());
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topLoadingError", event);
    }

    private boolean parametersSet() {
        return mVideoId != null && mAccountId != null && mPolicyKey != null && mAutoplay != null;
    }
}
