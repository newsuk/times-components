package com.storybooknative.stubs

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class ArticleEvents : BaseJavaModule() {
    override fun getName() = "ArticleEvents"

    @ReactMethod
    fun onArticlePress(url: String) {
        Log.d(name, "onArticlePress $url")
    }

    @ReactMethod
    fun onArticleLoaded(articleId: String, extras: ReadableMap) {
        Log.d(name, "onArticleLoaded $articleId $extras")
    }

    @ReactMethod
    fun onAuthorPress(slug: String) {
        Log.d(name, "onAuthorPress $slug")
    }

    @ReactMethod
    fun onLinkPress(url: String) {
        Log.d(name, "onLinkPress $url")
    }

    @ReactMethod
    fun onVideoPress(info: ReadableMap) {
        Log.d(name, "onVideoPress $info")
    }

    @ReactMethod
    fun onTopicPress(url: String) {
        Log.d(name, "onTopicPress $url")
    }

    @ReactMethod
    fun onCommentsPress(articleId: String, url: String) {
        Log.d(name, "onCommentsPress $articleId $url")
    }

    @ReactMethod
    fun onCommentGuidelinesPress() {
        Log.d(name, "onCommentGuidelinesPress")
    }
}
