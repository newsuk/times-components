package uk.co.news.rntbrightcovevideo;

import android.support.annotation.NonNull;
import android.util.Log;
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
import com.facebook.react.uimanager.ThemedReactContext;

public class BrightcovePlayerView extends BrightcoveExoPlayerVideoView {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    public BrightcovePlayerView(final ThemedReactContext context) {
        super(context);
        finishInitialization();
        this.setMediaController(new BrightcoveMediaController(this));

        Log.d(TAG, "setting red");

        this.setBackgroundColor(0xFFFF0000);
    }

    private EventEmitter setupEventEmitter() {
        EventEmitter eventEmitter = this.getEventEmitter();
        eventEmitter.on(EventType.VIDEO_SIZE_KNOWN, new EventListener() {
            @Override
            public void processEvent(Event e) {
                fixVideoLayout();
            }
        });

        /*
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
        });*/
        return eventEmitter;
    }

    public void initVideo(String videoId, String accountId, String policyKey) {
            EventEmitter eventEmitter = setupEventEmitter();

            Catalog catalog = new Catalog(eventEmitter, accountId, policyKey);
            catalog.findVideoByID(videoId, createVideoListener());
    }

    @NonNull
    private VideoListener createVideoListener() {
        return new VideoListener() {
            @Override
            public void onVideo(final Video video) {
                Log.d("$$$$$$$$$", video.toString());

                BrightcovePlayerView.this.add(video);
                BrightcovePlayerView.this.start();

                //if (mAutoplay) {
                //    mPlayerView.start();
                //}
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

}
