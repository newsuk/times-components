package uk.co.news.rntbrightcovevideo;

import com.facebook.common.internal.ImmutableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;

import java.util.Map;

import javax.annotation.Nullable;

public class RNTBrightcoveManager extends SimpleViewManager<RNTBrightcoveView> {
  private static final int PLAY = 1;
  private static final int PAUSE = 2;

  public static final String REACT_CLASS = "RNTBrightcove";
  private static final String PLAY_KEY = "play";
  private static final String PAUSE_KEY = "pause";
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

  @ReactProp(name = "policyId")
  public void setPolicyId(RNTBrightcoveView view, String policyId) {
    mView.setPolicyId(policyId);
  }


  @Override
  public void receiveCommand(RNTBrightcoveView view, int commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case PLAY:
        view.start();
        break;

      case PAUSE:
        view.pause();
        break;
    }
  }

  @Override
  @Nullable
  public Map<String, Integer> getCommandsMap() {
    return ImmutableMap.of(PLAY_KEY, PLAY, PAUSE_KEY, PAUSE);
  }

  @Override
  public RNTBrightcoveView createViewInstance(ThemedReactContext context) {
    mView = new RNTBrightcoveView(context);
    return mView;
  }
}
