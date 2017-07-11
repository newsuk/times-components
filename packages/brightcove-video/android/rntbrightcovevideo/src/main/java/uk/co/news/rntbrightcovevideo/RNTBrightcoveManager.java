package uk.co.news.rntbrightcovevideo;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


public class RNTBrightcoveManager extends SimpleViewManager<RNTBrightcoveView> {
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

  @ReactProp(name = "policyId")
  public void setPolicyId(RNTBrightcoveView view, String policyId) {
    mView.setPolicyId(policyId);
  }

  @Override
  public RNTBrightcoveView createViewInstance(ThemedReactContext context) {
    mView = new RNTBrightcoveView(context);
    return mView;
  }
}
