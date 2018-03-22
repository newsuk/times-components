package uk.co.news.rntbrightcovevideo;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.view.SurfaceView;

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

    private Boolean autoplay;
    private Boolean isPlaying = false;
    private Boolean isFullscreen = false;
    private final float progress = 0;

    public BrightcovePlayerView(Context context) {
        super(context);
        setBackgroundColor(Color.BLACK);
        finishInitialization();
        setMediaController(new BrightcoveMediaController(this));
    }

    private EventEmitter setupEventEmitter() {
        final BrightcovePlayerView playerView = this;

        EventEmitter eventEmitter = getEventEmitter();
        eventEmitter.on(EventType.VIDEO_SIZE_KNOWN, new EventListener() {
            @Override
            public void processEvent(Event e) {
                fixVideoLayout();
            }
        });
        eventEmitter.on(EventType.PLAY, onEvent(true));
        eventEmitter.on(EventType.PAUSE, onEvent(false));
        eventEmitter.on(EventType.PROGRESS, onEvent(true));
        eventEmitter.on(EventType.COMPLETED, new EventListener() {
            @Override
            public void processEvent(Event e) {
                playerView.bubbleState(false, playerView.getDuration());
            }
        });
        eventEmitter.on(EventType.SEEK_TO, new EventListener() {
            @Override
            public void processEvent(Event e) {
                playerView.bubbleCurrentState();
            }
        });
        eventEmitter.on(EventType.ENTER_FULL_SCREEN, new EventListener() {
            @Override
            public void processEvent(Event e) {
                isFullscreen = true;
                playerView.bubbleCurrentState();
                playerView.getEventEmitter().emit(EventType.CONFIGURATION_CHANGED);
            }
        });
        eventEmitter.on(EventType.EXIT_FULL_SCREEN, new EventListener() {
            @Override
            public void processEvent(Event e) {
                isFullscreen = false;
                playerView.bubbleCurrentState();
                playerView.getEventEmitter().emit(EventType.CONFIGURATION_CHANGED);
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

    private void bubbleCurrentState() {
        bubbleState(getIsPlaying(), (int) getPlayheadPosition());
    }

    private void bubbleState(Boolean isPlaying, int headPos) {
        this.isPlaying = isPlaying;

        try {
            RNTBrightcoveView parentView = (RNTBrightcoveView) getParent();
            parentView.emitState(this.isPlaying, headPos);
        } catch (ClassCastException exc) {
            // ignore
        }
    }

    public void initVideo(String videoId, String accountId, String policyKey, Boolean autoplay) {
        this.autoplay = autoplay;

        EventEmitter eventEmitter = setupEventEmitter();

        Catalog catalog = new Catalog(eventEmitter, accountId, policyKey);
        catalog.findVideoByID(videoId, createVideoListener());
    }

    private EventListener onEvent(final Boolean isPlaying) {
        final BrightcovePlayerView playerView = this;

        return new EventListener() {
            @Override
            public void processEvent(Event event) {
                playerView.bubbleState(isPlaying, (int) playerView.getPlayheadPosition());
            }
        };
    }

    @NonNull
    private VideoListener createVideoListener() {
        return new VideoListener() {
            @Override
            public void onVideo(final Video video) {
                add(video);

                seekTo((int) progress);

                invalidate();
                requestLayout();

                if (autoplay) {
                    start();
                }
            }
        };
    }

    private void fixVideoLayout() {
        final int viewW = getMeasuredWidth();
        final int viewH = getMeasuredHeight();

        SurfaceView surfaceView = (SurfaceView) getRenderView();

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

    public Boolean getIsPlaying() {
        return isPlaying;
    }

    public Boolean getIsFullscreen() {
        return isFullscreen;
    }

    public float getPlayheadPosition() {
        return playheadPosition;
    }

}
