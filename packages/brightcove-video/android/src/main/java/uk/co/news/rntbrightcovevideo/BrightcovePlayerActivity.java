package uk.co.news.rntbrightcovevideo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

public class BrightcovePlayerActivity extends AppCompatActivity {
    private final String TAG = this.getClass().getSimpleName();

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
        View decorView = getWindow().getDecorView();
        int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
        decorView.setSystemUiVisibility(uiOptions);

        super.onCreate(savedInstanceState);

        BrightcovePlayerView playerView = new BrightcovePlayerView(this);

        playerView.initVideo(videoId, accountId, policyKey, true, true);

        setContentView(playerView);
    }
}