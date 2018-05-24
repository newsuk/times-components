package com.storybooknative;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.devsupport.DevInternalSettings;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "storybooknative";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DevInternalSettings settings = (DevInternalSettings) getReactNativeHost().getReactInstanceManager().getDevSupportManager().getDevSettings();
        if (settings != null) {
            settings.setBundleDeltasEnabled(false);
        }      
    }
}
