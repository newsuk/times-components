package uk.co.thetimes.xnative;

import com.facebook.react.ReactPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import java.util.ArrayList;
import java.util.List;

public class XNative {
    public static List<ReactPackage> getPackages() {
        List<ReactPackage> packages = new ArrayList<>();
        packages.add(new ComponentsPackage());
        packages.add(new SvgPackage());
        packages.add(new RNCWebViewPackage());
        return packages;
    }
}
