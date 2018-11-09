package com.storybooknative.stubs

import com.facebook.react.bridge.BaseJavaModule
import java.util.*

class ReactConfig : BaseJavaModule() {

    override fun getName(): String {
        return "ReactConfig"
    }

    override fun hasConstants(): Boolean {
        return true
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap<String, Any>().apply {
            put("deviceId", "")
            put("operatingSystemVersion", "")
            put("cookieEid", "")
            put("isLoggedIn", "")
            put("graphqlEndPoint", "https://api.thetimes.co.uk/graphql")
            put("adNetworkId", "")
            put("timezone", "")
        }
    }
}
