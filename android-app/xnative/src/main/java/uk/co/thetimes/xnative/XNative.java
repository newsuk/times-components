package uk.co.thetimes.xnative;

import com.facebook.common.internal.ImmutableList;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;

import java.util.List;

public class XNative {
    public static List<ReactPackage> getPackages() {
        return ImmutableList.of(
                new ComponentsPackage(),
                new SvgPackage(),
                new RNCWebViewPackage(),
                new RNDeviceInfo(),
                new NetInfoPackage()
        );
    }
}
