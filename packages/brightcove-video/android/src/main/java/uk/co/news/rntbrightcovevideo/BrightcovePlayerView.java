package uk.co.news.rntbrightcovevideo;

import android.content.Context;
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

public class BrightcovePlayerView extends BrightcoveExoPlayerVideoView {

    public static final String TAG = BrightcovePlayerView.class.getSimpleName();

    private Boolean mAutoplay;
    private String mPlayerStatus;
    private float mStartPlayheadPosition = 0;

    public BrightcovePlayerView(final Context context) {
        super(context);
        finishInitialization();
        this.setMediaController(new BrightcoveMediaController(this));
    }

    private EventEmitter setupEventEmitter() {
        final BrightcovePlayerView playerView = BrightcovePlayerView.this;

        EventEmitter eventEmitter = this.getEventEmitter();
        eventEmitter.on(EventType.VIDEO_SIZE_KNOWN, new EventListener() {
            @Override
            public void processEvent(Event e) {
               fixVideoLayout();
            }
        });
        eventEmitter.on(EventType.PLAY, onEvent("playing"));
        eventEmitter.on(EventType.PAUSE, onEvent("paused"));
        eventEmitter.on(EventType.COMPLETED, new EventListener() {
            @Override
            public void processEvent(Event e) {
                playerView.bubbleState("paused", ((float) playerView.getDuration() / 1000));
            }
        });
        eventEmitter.on(EventType.SEEK_TO, new EventListener() {
            @Override
            public void processEvent(Event e) {
                playerView.bubbleState(playerView.getPlayerStatus(), playerView.getPlayheadPosition() / 1000);
            }
        });
        eventEmitter.on(EventType.ERROR, new EventListener() {
            @Override
            public void processEvent(Event e) {
                ((RNTBrightcoveView) playerView.getParent()).emitError(e);
            }
        });
        return eventEmitter;
    }

    private void bubbleState(String status, Float headPos) {
        ((RNTBrightcoveView) this.getParent()).emitState(status, headPos);
    }

    public void initVideo(String videoId, String accountId, String policyKey, Boolean autoplay, Boolean isFullscreenButtonHidden) {
            View fullScreenButton = this.findViewById(com.brightcove.player.R.id.full_screen);
            fullScreenButton.setVisibility(isFullscreenButtonHidden ? View.GONE : View.VISIBLE);

            mAutoplay = autoplay;

            EventEmitter eventEmitter = setupEventEmitter();

            Catalog catalog = new Catalog(eventEmitter, accountId, policyKey);
            catalog.findVideoByID(videoId, createVideoListener());
    }

    private EventListener onEvent(final String playerStatus) {
        final BrightcovePlayerView playerView = BrightcovePlayerView.this;

        return new EventListener() {
            @Override
            public void processEvent(Event event) {
                playerView.bubbleState(playerStatus, playerView.getPlayheadPosition() / 1000);
            }
        };
    }

    @NonNull
    private VideoListener createVideoListener() {
        return new VideoListener() {
            @Override
            public void onVideo(final Video video) {
                BrightcovePlayerView.this.add(video);

                BrightcovePlayerView.this.seekTo((int) mStartPlayheadPosition);

                BrightcovePlayerView.this.invalidate();
                BrightcovePlayerView.this.requestLayout();

                if (mAutoplay) {
                    BrightcovePlayerView.this.start();
                }
            }
        };
    }

    private void fixVideoLayout() {
        Log.d(TAG, "fixVideoLayout");

        final int viewW = this.getMeasuredWidth();
        final int viewH = this.getMeasuredHeight();

        SurfaceView surfaceView = (SurfaceView) this.getRenderView();

        surfaceView.measure(viewW, viewH);

        final int surfaceW = surfaceView.getMeasuredWidth();
        final int surfaceH = surfaceView.getMeasuredHeight();

        final int leftOffset = (viewW - surfaceW) / 2;
        final int topOffset = (viewH - surfaceH) / 2;

        surfaceView.layout(
                leftOffset,
                topOffset,
                leftOffset + surfaceW,
                topOffset + surfaceH
        );
    }

    public void setStartPlayheadPosition(float startPlayheadPosition) {
        mStartPlayheadPosition = startPlayheadPosition;
    }

    public String getPlayerStatus() {
        return mPlayerStatus;
    }

    public float getPlayheadPosition() {
        return playheadPosition;
    }

}
