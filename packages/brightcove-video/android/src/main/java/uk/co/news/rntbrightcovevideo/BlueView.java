package uk.co.news.rntbrightcovevideo;

import android.util.Log;
import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;

/**
 * User: dickie
 * Date: 22/08/2017
 * Time: 10:45
 */

public class BlueView extends View {
    public static final String TAG = RNTBrightcoveView.class.getSimpleName();

    public BlueView(final ThemedReactContext context) {
        super(context);

        Log.d(TAG, "setting blue");

        this.setBackgroundColor(0xFF000FF);
    }
}
