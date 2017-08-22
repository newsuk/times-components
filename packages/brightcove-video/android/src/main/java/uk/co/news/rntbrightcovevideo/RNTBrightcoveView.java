package uk.co.news.rntbrightcovevideo;

import android.util.Log;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.uimanager.ThemedReactContext;

public class RNTBrightcoveView extends FrameLayout {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private String mPlayerStatus;
    private Boolean mAutoplay;
    private BlueView mPlayerView;
    private ThemedReactContext mContext;

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);

        mContext = context;

        this.setBackgroundColor(0xFF00FF00);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        Log.d(TAG, "onLayout");
        this.removeAllViews();
        initVideo();
    }

    public void setVideoId(final String videoId) {
        if (mVideoId == null) {
            mVideoId = videoId;
        }
    }

    public void setAccountId(final String accountId) {
        if (mAccountId == null) {
            mAccountId = accountId;
        }
    }

    public void setPolicyKey(final String policyKey) {
        if (mPolicyKey == null) {
            mPolicyKey = policyKey;
        }
    }

    public void setAutoplay(final Boolean autoplay) {
        if (mAutoplay == null) {
            mAutoplay = autoplay;
        }
    }

    private void initVideo() {
        if (parametersSet()) {
            mPlayerView = new BlueView(mContext);

            Log.d(TAG, "adding player view");

            ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(1000, 1000);

            this.addView(mPlayerView, layoutParams);

            //mPlayerView.initVideo(mVideoId, mAccountId, mPolicyKey);
        }
    }

    /*
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
    */




/*




    private EventListener onEvent(final String playerStatus) {
        return new EventListener() {
            @Override
            public void processEvent(Event event) {
                mPlayerStatus = playerStatus;
                emitState();
            }
        };
    }
    */

    private final Runnable mLayoutRunnable = new Runnable() {
        @Override
        public void run() {
            measure(
                    MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY)
            );
            layout(getLeft(), getTop(), getRight(), getBottom());
        }
    };

    @Override
    public void requestLayout() {
        super.requestLayout();

        // The toolbar relies on a measure + layout pass happening after it calls requestLayout().
        // Without this, certain calls (e.g. setLogo) only take effect after a second invalidation.
        post(mLayoutRunnable);
    }



    private boolean parametersSet() {
        return mVideoId != null && mAccountId != null && mPolicyKey != null && mAutoplay != null;
    }
}
