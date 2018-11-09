package com.storybooknative.stubs

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap


class ReactAnalytics : BaseJavaModule() {
    override fun getName() = "ReactAnalytics"

    @ReactMethod
    fun track(extras: ReadableMap) {
        Log.d(name, "track $extras")
    }
}
