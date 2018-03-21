package uk.co.news.rntbrightcovevideo;

import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.brightcove.player.edge.Catalog;
import com.brightcove.player.edge.VideoListener;
import com.brightcove.player.event.EventEmitter;
import com.brightcove.player.model.Video;
import com.brightcove.player.view.BrightcovePlayer;

public class BrightcovePlayerActivity extends BrightcovePlayer {
    private final String TAG = getClass().getSimpleName();

    private static final String PROP_ACCOUNT_ID = "accountId";
    private static final String PROP_POLICY_KEY = "policyKey";
    private static final String PROP_VIDEO_ID = "videoId";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Bundle extra = getIntent().getExtras();
        if (extra == null) {
            Log.e(TAG, "Video source not found");
            return;
        }
        final String accountId = extra.getString(PROP_ACCOUNT_ID);
        final String policyKey = extra.getString(PROP_POLICY_KEY);
        final String videoId = extra.getString(PROP_VIDEO_ID);

        // Hide the status bar.
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);

        // When extending the BrightcovePlayer, we must assign the BrightcoveVideoView before
        // entering the superclass. This allows for some stock video player lifecycle
        // management.  Establish the video object and use its event emitter to get important
        // notifications and to control logging.
        setContentView(R.layout.brightcove_player_activity);
        brightcoveVideoView = findViewById(R.id.brightcove_video_view);
        super.onCreate(savedInstanceState);

        EventEmitter eventEmitter = brightcoveVideoView.getEventEmitter();
        Catalog catalog = new Catalog(eventEmitter, accountId, policyKey);

        catalog.findVideoByID(videoId, new VideoListener() {
            @Override
            public void onVideo(Video video) {
                brightcoveVideoView.add(video);
                brightcoveVideoView.start();
            }
        });
    }
}
