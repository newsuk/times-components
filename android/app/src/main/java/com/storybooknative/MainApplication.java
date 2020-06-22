package com.storybooknative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.storybooknative.stubs.StorybookStubPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.asList(
                    new MainReactPackage(),
                    new AsyncStoragePackage(),
                    new RNDeviceInfo(),
                    new NetInfoPackage(),
                    new ComponentsPackage(),
                    new StorybookStubPackage(),
                    new SvgPackage(),
                    new RNCWebViewPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "storybook-native/index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
