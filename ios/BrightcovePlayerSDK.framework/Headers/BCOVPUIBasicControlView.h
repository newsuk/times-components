//
// BCOVPUIBasicControlView.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <UIKit/UIKit.h>
#import <MediaPlayer/MediaPlayer.h>

#import "BCOVPUICommon.h"


@class BCOVPUILayoutView;
@class BCOVPUISlider;
@class BCOVPUIButton;


/** Width value passed to layoutViewWithControlFromTag:width:elasticity
 *  to indicate that the default width for the control shoudl be used. */
extern CGFloat kBCOVPUILayoutUseDefaultValue;

/**
 * BCOVPUIControlLayout
 * The BCOVPUIControlLayout object is created with a set
 * of controls embedded in BCOVPUILayoutView objects
 * with a few customizing parameters.
 * The BCOVPUIControlLayout object is installed in
 * a BCOVPUILayoutView for display in a player view.
 */
@interface BCOVPUIControlLayout : NSObject <NSCopying>

/**
 * standardLayoutItems is the array containing one or more
 * subarrays of controls presented when the player view width
 * is greater than compactLayoutMaximumWidth.
 * Each subarray contains a list of BCOVPUILayoutView objects
 * that will be presented in a BCOVPUILayoutView.
 * Each subarray represents a control bar in the player view.
 * standardLayoutItems typically consists of a single subarray
 * representing a single row of controls.
 */
@property (nonatomic, copy, readonly) NSArray *standardLayoutItems;

/**
 * compactLayoutItems is the array containing one or more
 * subarrays of controls presented when the player view width
 * is less than compactLayoutMaximumWidth.
 * Each subarray contains a list of BCOVPUILayoutView objects
 * that will be presented in a BCOVPUILayoutView.
 * Each subarray represents a control bar in the player view.
 * compactLayoutItems typically consists of two subarrays
 * representing two row of controls, where each row has fewer
 * controls to better fit the width of an iPhone screen.
 */
@property (nonatomic, copy, readonly) NSArray *compactLayoutItems;

/**
 * Set of all layout objects.
 * The same object instances are typically used in both the
 * standardLayoutItems and compactLayoutItems containers.
 * This set contains exactly one of each and every BCOVPUILayoutView
 * object, and is used as a convenience for iterating through every item.
 */
@property (nonatomic, copy, readonly) NSSet *allLayoutItems;


/**
 * The vertical height of each bar of controls
 * represented in standardLayoutItems and compactLayoutItems.
 */
@property (nonatomic, assign) CGFloat controlBarHeight;

/**
 * The horizontal spacing between layout views.
 */
@property (nonatomic, assign) CGFloat horizontalItemSpacing;

/**
 * The maximum width of the compact controls. If the controls view
 * is smaller than this value, the compactLayoutItems will be presented.
 * If smaller, the standardLayoutItems will be used.
 */
@property (nonatomic, assign) CGFloat compactLayoutMaximumWidth;

/**
 * Initializes a BCOVPUIControlLayout layout with default settings.
 *
 * @param standardLayoutLines An array of arrays, where each sub-array 
 * corresponds to one row of controls in the player control view.
 * Each of these sub-arrays is a list of BCOVPUILayoutView objects used in the
 * standard width layout. Each layout view typically contains a single 
 * control element and can be created with
 * [BCOVPUIBasicControlView layoutViewWithControlFromTag:width:elasticity:]
 *
 * @param compactLayoutLines An array of arrays, where each sub-array
 * corresponds to one row of controls in the player control view.
 * Each of these sub-arrays is a list of BCOVPUILayoutView objects used in the
 * compact width layout (typically, portrait orientation on an iPhone).
 *
 * @return A BCOVPUIControlLayout instance initialized with the specified controls.
 */
- (instancetype)initWithStandardControls:(NSArray *)standardLayoutLines compactControls:(NSArray *)compactLayoutLines;

/**
 * Convenience factory method to create a control layout
 * designed for video on demand.
 */
+ (instancetype)basicVODControlLayout;

/**
 * Convenience factory method to create a control layout
 * designed for a live video.
 */
+ (instancetype)basicLiveControlLayout;

/**
 * Convenience factory method to create a control layout
 * designed for live DVR playback.
 */
+ (instancetype)basicLiveDVRControlLayout;

@end


/**
 * Basic controls view.
 */
@interface BCOVPUIBasicControlView : UIView

/** The background view for the controls. On iOS 8+, this a UIVisualEffectView
 * with dark blur view.  On iOS 7, this is a black view with slight opacity. */
@property (nonatomic, weak, readonly) UIView *backgroundView;

/** The layout used organize the controls. */
@property (nonatomic, copy) BCOVPUIControlLayout *layout;

/** The playback button */
@property (nonatomic, weak, readonly) BCOVPUIButton *playbackButton;

/** The jump back button */
@property (nonatomic, weak, readonly) BCOVPUIButton *jumpBackButton;

/** The current time (elapsed) label */
@property (nonatomic, weak, readonly) UILabel *currentTimeLabel;

/** The time separator label */
@property (nonatomic, weak, readonly) UILabel *timeSeparatorLabel;

/** The duration label */
@property (nonatomic, weak, readonly) UILabel *durationLabel;

/** The progress slider */
@property (nonatomic, weak, readonly) BCOVPUISlider *progressSlider;

/** The closed caption button */
@property (nonatomic, weak, readonly) UIButton *closedCaptionButton;

/** The screen mode (fullscreen) button */
@property (nonatomic, weak, readonly) BCOVPUIButton *screenModeButton;

/** The Video 360 options button */
/** Only appears on iPhone devices */
@property (nonatomic, weak, readonly) BCOVPUIButton *video360Button;

/** The external route (airplay) button */
@property (nonatomic, weak, readonly) MPVolumeView *externalRouteView;

/** The "go to live" button */
@property (nonatomic, weak, readonly) BCOVPUIButton *liveButton;

/** Yes if the closedCaptionButton is visible. No if invisible. */
@property (nonatomic, readonly, getter=isClosedCaptionEnabled) BOOL closedCaptionEnabled;

/** Yes if the externalRouteView is visible. No if invisible. */
@property (nonatomic, assign, readonly, getter=isExternalRouteEnabled) BOOL externalRouteEnabled;

/** Set to YES to change the control view's UI to the advertising state. */
@property(nonatomic, readwrite) BOOL advertisingMode;

/**
 * Convenience factory method for creating a layout view
 * with a subview determined by the specified tag.
 * Layout views are bundled into arrays and used to create
 * a BCOVPUIControlLayout instance.
 *
 * @param tag A tag value indicating the desired control or empty layout view.
 * @param width The minimum width of the new layout view. Pass kBCOVPUILayoutUseDefaultValue to use the default width for the specific control.
 * @param elasticity The relative amount that a layout view can expand to fill space. Elasticity is relative to other layout views.
 * @return A BCOVPUILayoutView instance initialized with a subview specified by the tag, width, and elasticity.
 */
+ (BCOVPUILayoutView *)layoutViewWithControlFromTag:(BCOVPUIViewTag)tag width:(CGFloat)width elasticity:(CGFloat)elasticity;

/**
 * Convenience factory method to create a control view with
 * a control layout for Video On Demand streams.
 *
 * @return A BCOVPUIBasicControlView instance initialzed with a control layout for Video On Demand streams.
 */
+ (instancetype)basicControlViewWithVODLayout;

/**
 * Convenience factory method to create a control view with
 * a control layout for live video streams.
 *
 * @return A BCOVPUIBasicControlView instance initialzed with a control layout for live video streams.
 */

+ (instancetype)basicControlViewWithLiveLayout;

/**
 * Convenience factory method to create a control view with
 * a control layout for live DVR video streams.
 *
 * @return A BCOVPUIBasicControlView instance initialzed with a control layout for live DVR video streams.
 */
+ (instancetype)basicControlViewWithLiveDVRLayout;

/**
 * Enable or disable all the standard controls
 *
 * @param enabled YES to enable; NO to disable.
 */
- (void)enableControls:(BOOL)enabled;

/**
 * Updates all label components with the specified font size.
 *
 * @param fontSize The font size to update components with.
 */
- (void)setFontSizeForLabels:(CGFloat)fontSize;

/**
 * Updates all button components with the specified font size.
 *
 * @param fontSize The font size to update components with.
 */
- (void)setFontSizeForButtons:(CGFloat)fontSize;

/**
 * Updates all label components with the specified font color.
 *
 * @param textColor The font size to update components with.
 */
- (void)setTextColorForLabels:(UIColor *)textColor;

/**
 * Updates all button components with the specified color for state.
 *
 * @param titleColor The color of the title to set.
 * @param state Controls state to set.
 */
- (void)setTitleColorForButtons:(UIColor *)titleColor forState:(UIControlState)state;

/**
 * Constructs the UI control item with the specified tag.
 * Returned object may be a BCOVPUIButton, BCOVPUISlider, UILabel,
 * or MPVolumeView depending on the specified tag.
 * This method is typically only used by +layoutViewWithControlFromTag:width:elasticity:
 * to create the control placed inside a BCOVPUILayoutView.
 * Default styles will be applied.
 *
 * @param tag The tag to construct.
 * @return Initialized UI component.
 */
+ (UIView *)createPUIControlItemWithViewTag:(BCOVPUIViewTag)tag;

@end


