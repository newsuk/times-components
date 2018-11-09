package com.storybooknative.stubs

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.ReactMethod

class TopicEvents : BaseJavaModule() {
    override fun getName() = "TopicEvents"

    @ReactMethod
    fun onArticlePress(url: String) {
        Log.d(name, "onArticlePress $url")
    }
}
