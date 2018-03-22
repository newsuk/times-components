package uk.co.news.rntbrightcovevideo;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.res.Configuration;
import android.graphics.Color;
import android.view.ContextThemeWrapper;
import android.widget.FrameLayout;

import com.brightcove.player.event.Event;
import com.brightcove.player.event.EventType;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class RNTBrightcoveView extends FrameLayout {
    private String videoId;
    private String accountId;
    private String policyKey;
    private Boolean autoplay;
    private Boolean hideFullScreenButton;
    private BrightcovePlayerView playerView;

    public RNTBrightcoveView(final ThemedReactContext context) {
        super(context);
        setBackgroundColor(Color.BLACK);
    }

    @Override
    protected void onConfigurationChanged(Configuration newConfig) {
        playerView.getEventEmitter().emit(EventType.CONFIGURATION_CHANGED);

        super.onConfigurationChanged(newConfig);
    }

    public void play() {
        playerView.start();
    }

    public void pause() {
        playerView.pause();
    }

    public void setVideoId(final String videoId) {
        if (this.videoId == null) {
            this.videoId = videoId;
            initPlayerView();
        }
    }

    public void setAccountId(final String accountId) {
        if (this.accountId == null) {
            this.accountId = accountId;
            initPlayerView();
        }
    }

    public void setPolicyKey(final String policyKey) {
        if (this.policyKey == null) {
            this.policyKey = policyKey;
            initPlayerView();
        }
    }

    public void setAutoplay(final Boolean autoplay) {
        if (this.autoplay == null) {
            this.autoplay = autoplay;
            initPlayerView();
        }
    }

    public void setHideFullScreenButton(final Boolean hideFullScreenButton) {
        if (this.hideFullScreenButton == null) {
            this.hideFullScreenButton = hideFullScreenButton;
            initPlayerView();
        }
    }

    private void initPlayerView() {
        if (parametersSet()) {
            boolean hideFullScreenButton = this.hideFullScreenButton != null ? this.hideFullScreenButton : false;
            int theme = hideFullScreenButton ? R.style.FullScreenButtonDisabled : R.style.FullScreenButtonEnabled;

            playerView = new BrightcovePlayerView(new ContextThemeWrapper(getActivity(), theme));


            addView(playerView);

            playerView.initVideo(videoId, accountId, policyKey, autoplay);
        }
    }

    // Required for brightcove player full screen (context type has to be Activity)
    private Activity getActivity() {
        Context context = getContext();
        while (context instanceof ContextWrapper) {
            if (context instanceof Activity) {
                return (Activity) context;
            }
            context = ((ContextWrapper) context).getBaseContext();
        }
        return null;
    }

    public void emitState(final Boolean isPlaying, final int progress) {
        WritableMap event = Arguments.createMap();

        if (isPlaying != null) {
            Integer duration = playerView.getDuration();

            event.putBoolean("isPlaying", isPlaying);
            event.putBoolean("isFullscreen", playerView.getIsFullscreen());
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
        return videoId != null && accountId != null && policyKey != null && autoplay != null && hideFullScreenButton != null;
    }
}
