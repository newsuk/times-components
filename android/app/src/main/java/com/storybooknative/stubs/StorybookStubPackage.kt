package com.storybooknative.stubs

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

// Stub NativeModules for storybook
class StorybookStubPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext) = listOf(
            ArticleEvents(),
            AuthorProfileEvents(),
            ReactAnalytics(),
            ReactConfig(),
            TopicEvents()
    )

    override fun createViewManagers(reactContext: ReactApplicationContext) = emptyList<ViewManager<View, ReactShadowNode<*>>>()
}
