package uk.co.news.rntbrightcovevideo;

import android.content.res.Configuration;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.facebook.react.uimanager.ThemedReactContext;

public class RNTBrightcoveView extends RelativeLayout {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private String mPlayerStatus;
    private Boolean mAutoplay;
    private BrightcovePlayerView mPlayerView;
    private ThemedReactContext mContext;

    private android.os.Handler handler = new android.os.Handler();

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);

        mContext = context;

        initVideo();

        this.setBackgroundColor(0xFF000000);
    }

    @Override
    protected void onConfigurationChanged(Configuration newConfig) {
        Log.d(TAG, "onConfigurationChanged");

        this.removeAllViews();

        initVideo();

        super.onConfigurationChanged(newConfig);
    }

    public BrightcovePlayerView getPlayerView() {
        return mPlayerView;
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

    private void initVideo() {
        if (parametersSet()) {
            Log.d(TAG, "adding player view");

            mPlayerView = new BrightcovePlayerView(mContext);

            RNTBrightcoveView.this.addView(mPlayerView, new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

            mPlayerView.initVideo(mVideoId, mAccountId, mPolicyKey, mAutoplay);

            requestLayout();
            invalidate();
        }
    }

    private boolean parametersSet() {
        return mVideoId != null && mAccountId != null && mPolicyKey != null && mAutoplay != null;
    }
}
