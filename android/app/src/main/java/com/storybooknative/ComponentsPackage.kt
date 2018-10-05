package com.storybooknative

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class ComponentsPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext) = listOf(ReactTextHelper())

    override fun createViewManagers(reactContext: ReactApplicationContext) = emptyList<ViewManager<View, ReactShadowNode<*>>>()
}
