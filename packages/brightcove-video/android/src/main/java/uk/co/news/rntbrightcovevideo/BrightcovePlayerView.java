package uk.co.news.rntbrightcovevideo;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;

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

    public BrightcovePlayerView(Context context) {
        super(context);
        setBackgroundColor(Color.BLACK);
        finishInitialization();
        setMediaController(new BrightcoveMediaController(this));
    }

    private EventEmitter setupEventEmitter() {
        final BrightcovePlayerView playerView = this;
        final EventEmitter eventEmitter = getEventEmitter();

        eventEmitter.on(EventType.DID_PLAY, onEvent());
        eventEmitter.on(EventType.DID_PAUSE, onEvent());
        eventEmitter.on(EventType.COMPLETED, new EventListener() {
            @Override
            public void processEvent(Event e) {
                playerView.bubbleState(false, playerView.getDuration(), isFullScreen());
            }
        });
        eventEmitter.on(EventType.DID_SEEK_TO, onEvent());
        eventEmitter.on(EventType.ERROR, new EventListener() {
            @Override
            public void processEvent(Event e) {
                ((RNTBrightcoveView) playerView.getParent()).emitError(e);
            }
        });
        return eventEmitter;
    }

    private void bubbleCurrentState() {
        bubbleState(isPlaying(), (int) getPlayheadPosition(), isFullScreen());
    }

    private void bubbleState(boolean isPlaying, int headPos, boolean isFullScreen) {
        try {
            RNTBrightcoveView parentView = (RNTBrightcoveView) getParent();
            parentView.emitState(isPlaying, headPos, isFullScreen);
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

    private EventListener onEvent() {
        final BrightcovePlayerView playerView = this;

        return new EventListener() {
            @Override
            public void processEvent(Event event) {
                playerView.bubbleCurrentState();
            }
        };
    }

    @NonNull
    private VideoListener createVideoListener() {
        return new VideoListener() {
            @Override
            public void onVideo(final Video video) {
                add(video);

                invalidate();
                requestLayout();

                if (autoplay) {
                    start();
                }
            }
        };
    }

    public float getPlayheadPosition() {
        return playheadPosition;
    }
}
