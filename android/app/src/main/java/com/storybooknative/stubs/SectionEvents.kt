package com.storybooknative.stubs

import android.util.Log
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeArray

class SectionEvents : BaseJavaModule() {
    override fun getName() = "SectionEvents"

    @ReactMethod
    fun onPuzzlePress(url: String, title: String, id: String) {
        Log.d(name, "onPuzzlePress $url $title $id")
    }

    @ReactMethod
    fun onArticlePress(url: String, id: String) {
        Log.d(name, "onArticlePress $url $id")
    }

    @ReactMethod
    fun onSectionLoaded(sectionName: String, extras: ReadableMap) {
        Log.d(name, "onSectionLoaded $sectionName $extras")
    }

    @ReactMethod
    fun getSavedArticles(promise: Promise) {
        Log.d(name, "getSavedArticles")
        promise.resolve(WritableNativeArray())
    }

    @ReactMethod
    fun onArticleSavePress(save: Boolean, articleId: String, promise: Promise) {
        promise.resolve(true)
    }
}
