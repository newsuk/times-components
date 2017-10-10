package uk.co.news.rntbrightcovevideo;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;

public class ExtendedDynamic implements Dynamic {
    @Override
    public boolean isNull() {
        return false;
    }

    @Override
    public boolean asBoolean() {
        return false;
    }

    @Override
    public double asDouble() {
        return 0;
    }

    @Override
    public int asInt() {
        return 0;
    }

    @Override
    public String asString() {
        return null;
    }

    @Override
    public ReadableArray asArray() {
        return null;
    }

    @Override
    public ReadableMap asMap() {
        return null;
    }

    @Override
    public ReadableType getType() {
        return null;
    }

    @Override
    public void recycle() {

    }
}
