package com.storybooknative.stubs

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AuthorProfileEvents : BaseJavaModule() {
    override fun getName() = "AuthorProfileEvents"

    @ReactMethod
    fun onArticlePress(url: String) {
        Log.d(name, "onArticlePress $url")
    }

    @ReactMethod
    fun onTwitterLinkPress(url: String) {
        Log.d(name, "onTwitterLinkPress $url")
    }
}
