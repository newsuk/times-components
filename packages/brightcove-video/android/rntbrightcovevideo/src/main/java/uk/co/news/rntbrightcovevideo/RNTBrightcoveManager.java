package uk.co.news.rntbrightcovevideo;

import android.util.Log;

import com.facebook.common.internal.ImmutableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

public class RNTBrightcoveManager extends SimpleViewManager<RNTBrightcoveView> {

    public static final String TAG = RNTBrightcoveManager.class.getSimpleName();
    private static final String PLAY_KEY = "play";
    private static final String PAUSE_KEY = "pause";
    private static final int PLAY_VALUE = 1;
    private static final int PAUSE_VALUE = 2;

    public static final String REACT_CLASS = "RNTBrightcove";
    private RNTBrightcoveView mView;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactProp(name = "videoId")
    public void setVideoId(RNTBrightcoveView view, String videoId) {
        mView.setVideoId(videoId);
    }

    @ReactProp(name = "accountId")
    public void setAccountId(RNTBrightcoveView view, String accountId) {
        mView.setAccountId(accountId);
    }

    @ReactProp(name = "policyKey")
    public void setPolicyKey(RNTBrightcoveView view, String policyKey) {
        mView.setPolicyKey(policyKey);
    }

    @ReactProp(name = "autoplay")
    public void setAutoplay(RNTBrightcoveView view, Boolean autoplay) {
        mView.setAutoplay(autoplay);
    }

    @Override
    public void receiveCommand(RNTBrightcoveView view, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case PLAY_VALUE:
                view.start();
                break;

            case PAUSE_VALUE:
                view.pause();
                break;

            default:
                Log.d(TAG, "Invalid command id received");
        }
    }

    @Override
    @Nullable
    public Map<String, Integer> getCommandsMap() {
        return ImmutableMap.of(PLAY_KEY, PLAY_VALUE, PAUSE_KEY, PAUSE_VALUE);
    }

    @Override
    public RNTBrightcoveView createViewInstance(ThemedReactContext context) {
        mView = new RNTBrightcoveView(context);
        return mView;
    }
}
