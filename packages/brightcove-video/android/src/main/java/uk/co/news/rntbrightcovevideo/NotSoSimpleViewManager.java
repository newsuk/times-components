package uk.co.news.rntbrightcovevideo;

import android.view.View;

import com.facebook.react.uimanager.BaseViewManager;
import com.facebook.react.uimanager.LayoutShadowNode;

public abstract class NotSoSimpleViewManager<T extends View> extends BaseViewManager<T, LayoutShadowNode> {

    private LayoutShadowNode layoutShadowNode;

    public LayoutShadowNode getLayout() {
        return layoutShadowNode;
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        layoutShadowNode = new LayoutShadowNode();
        return layoutShadowNode;
    }

    @Override
    public Class<? extends LayoutShadowNode> getShadowNodeClass() {
        return LayoutShadowNode.class;
    }

    @Override
    public void updateExtraData(T root, Object extraData) {

    }
}
