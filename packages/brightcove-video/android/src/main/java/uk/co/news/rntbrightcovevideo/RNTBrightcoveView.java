package uk.co.news.rntbrightcovevideo;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Handler;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.brightcove.player.event.Event;
import com.brightcove.player.event.EventListener;
import com.brightcove.player.event.EventType;
import com.brightcove.player.mediacontroller.BrightcoveControlBar;
import com.brightcove.player.mediacontroller.BrightcoveMediaController;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaJustify;

import static com.facebook.yoga.YogaEdge.*;

public class RNTBrightcoveView extends FrameLayout {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    private String mVideoId;
    private String mAccountId;
    private String mPolicyKey;
    private Boolean mAutoplay;
    private Boolean mHideFullScreenButton;
    private BrightcovePlayerView mPlayerView;
    private LayoutShadowNode mLayout;

    private float origWidth;
    private float origHeight;


    public RNTBrightcoveView(final Context context, final LayoutShadowNode layout) {
        super(context);
        mLayout = layout;
        this.setBackgroundColor(Color.BLACK);
    }

    @Override
    protected void onConfigurationChanged(Configuration newConfig) {
        Log.d(TAG, "onConfigurationChanged");

        mPlayerView.getEventEmitter().emit(EventType.CONFIGURATION_CHANGED);

        super.onConfigurationChanged(newConfig);
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

            mPlayerView.getEventEmitter().on(EventType.ENTER_FULL_SCREEN, new EventListener() {
                @Override
                public void processEvent(Event event) {
                    origWidth = mLayout.getStyleWidth().value;
                    origHeight = mLayout.getStyleHeight().value;


                    Dynamic percent100 = new ExtendedDynamic() {
                        @Override
                        public String asString() {
                            return "100%";
                        }

                        @Override
                        public ReadableType getType() {
                            return ReadableType.String;
                        }
                    };

                    final int height = mLayout.getScreenHeight();
                    final int width = mLayout.getScreenWidth();

                    mLayout.setWidth(percent100);
                    mLayout.setHeight(percent100);

                    mLayout.setPosition("absolute");

                    mPlayerView.getEventEmitter().emit(EventType.CONFIGURATION_CHANGED);
                }
            });

            mPlayerView.getEventEmitter().on(EventType.EXIT_FULL_SCREEN, new EventListener() {
                @Override
                public void processEvent(Event event) {
                    final int screenWidth = mLayout.getScreenWidth();
                    final int screenHeight = mLayout.getScreenHeight();

                    mLayout.setWidth(new ExtendedDynamic() {
                        @Override
                        public String asString() {
                            return ((origWidth / screenWidth) * 100) + "%";
                        }

                        @Override
                        public ReadableType getType() {
                            return ReadableType.String;
                        }
                    });
                    mLayout.setHeight(new ExtendedDynamic() {
                        @Override
                        public String asString() {
                            return ((origHeight / screenHeight) * 100) + "%";
                        }

                        @Override
                        public ReadableType getType() {
                            return ReadableType.String;
                        }
                    });
                    mLayout.setPosition("relative");

                    mPlayerView.getEventEmitter().emit(EventType.CONFIGURATION_CHANGED);

                    final Handler handler = new Handler();
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            mLayout.setStyleWidth(origWidth);
                            mLayout.setStyleHeight(origHeight);
                        }
                    }, 1);
                }
            });

            addView(mPlayerView);

            boolean isFullscreenButtonHidden = mHideFullScreenButton != null ? mHideFullScreenButton : false;
            mPlayerView.initVideo(mVideoId, mAccountId, mPolicyKey, mAutoplay, isFullscreenButtonHidden);
        }
    }

    // Required for brightcove player full screen (context type has to be Activity)
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
