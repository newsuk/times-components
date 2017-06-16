//
// BCOVPUILayoutView.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <UIKit/UIKit.h>

/**
 * BCOVPUILayoutView view objects are used to lay out controls in a
 * BCOVPUIBasicControlView. Layout views are typically created with
 * BCOVPUIBasicControlView's +layoutViewWithControlFromTag:width:elasticity:
 * method, and contain a standard Player UI element such as a play button,
 * time code label, or progress slider.
 * You can also create empty layout views in which to add your own subviews.
 * The layout view properties determine exactly how the views are positioned
 * with respect to each other in variable-width layouts.
 */
@interface BCOVPUILayoutView : UIView

/**
 * The smallest width that will be set for the view when resized for layout.
 * If elasticity is set to zero, this will be the exact width of the view.
 */
@property (nonatomic, readwrite) float minimumWidth;

/**
 * Elasticity determines how much each view is resized to fill the available
 * width of the Player UI's control bar relative to all other views.
 * If there are two layout views in a control bar, and one has an elasticity
 * of 1.0, and the other has an elasticity of 2.0, the latter will grow twice
 * as much when the view is resized.
 * Each row of a control layout should typically contain at least one layout
 * view with an elasticity greater than zero.
 * A view with an elasticity of zero will remain at its minimum width.
 */
@property (nonatomic, readwrite) float elasticity;

/**
 * The "removed" property can be set to YES or NO to quickly hide or show
 * a particular layout view. This is more efficient than setting an entirely
 * new BCOVPUIControlLayout with a removed or added view.
 * Call -setNeedsLayout on the BCOVPUIBasicControlView after setting
 * this property to show the new layout.
 */
@property (nonatomic, readwrite, getter=isRemoved) BOOL removed;

@end
