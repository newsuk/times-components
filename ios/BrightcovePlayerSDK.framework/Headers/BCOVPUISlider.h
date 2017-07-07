//
// BCOVPUISlider.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <UIKit/UIKit.h>


/**
 * A subsclass of UISlider that provides a "buffered" track
 * with markers for advertising or generic use, plus an
 * "advertising mode" used to display progress of an ad.
 */

@interface BCOVPUISlider : UISlider

/**
 * Height of the track area
 * Default value is 5.
 */
@property(nonatomic, readwrite) CGFloat trackHeight;

/**
 * The amount of buffer. This value will be pinned to min/max.
 */
@property(nonatomic, readwrite) float bufferProgress;

/**
 * Set to YES to change the slider's UI to the advertising mode.
 * In advertising mode this hides the buffering indicator,
 * hides markers, and sets the min/max track colors to
 * advertisingMinimumTrackTintColor and advertisingMaximumTrackTintColor.
 */
@property(nonatomic, readwrite) BOOL advertisingMode;

/**
 * The tint color to be used for the buffered area.
 */
@property(nonatomic) UIColor *bufferProgressTintColor;

/**
 * The tint color used for the minimum track area when in advertising mode.
 * This color is also used for ad ticks marks in normal mode.
 * The default advertising minimum track color is yellow.
 */
@property(nonatomic) UIColor *advertisingMinimumTrackTintColor;

/**
 * The tint color used for the maximum track area when in advertising mode.
 * The default advertising minimum track color is dark gray.
 */
@property(nonatomic) UIColor *advertisingMaximumTrackTintColor;

/**
 * The color used for the generic markers drawn in the track area
 * when no custom marker images are supplied.
 * The default generic marker color is white.
 * Set to nil to restore the default color.
 */
@property(nonatomic) UIColor *markerTickColor;

/**
 * The duration (in seconds) represented by the range of the slider.
 * Used for positioning markers.
 * The default value is 30, but should be set to the length of its associated video.
 */
@property (nonatomic, readwrite) double duration;

/**
 * Add a marker that will be displayed on the slider.
 * @param position The location on the slider in proportion to the duration.
 * @param duration The duration represented by the tick mark; can be set to zero to draw the smallest size marker (2 pixels wide).
 * @param isAd YES indicates this marker represents an ad (drawn in yellow by default). NO indicates this is a generic marker (drawn in white by default).
 * @param image An optional image that will be drawn in place of the default marker indicator. Can be set to nil.
 */
- (void)addMarkerAt:(double)position duration:(double)duration isAd:(BOOL)isAd image:(UIImage *)image;

/**
 * Remove all markers at the specified position.
 * @param position The location on the slider of the marker to be removed.
 */
- (void)removeMarkerAtPosition:(double)position;

/**
 * Remove all markers from the slider.
 */
- (void)removeAllMarkers;

/**
 * Remove all generic markers from the slider.
 */
- (void)removeGenericMarkers;

/**
 * Remove all ad markers from the slider.
 */
- (void)removeAdMarkers;

/**
 * Set a custom minimum track image to be used in normal (non-advertising) mode.
 * @param image The image to be used on the minimum end of the track (typically the left side of the thumb). The image should be a resizeable UIImage, 'trackHeight' pixels high. When a custom image is set, markers will no longer be displayed. Set to nil to restore the default track images.
 * @param state The UIControlState for which this image will be active.
 */
- (void)setCustomMinimumTrackImage:(UIImage *)image forState:(UIControlState)state;

/**
 * Set a custom maximum track image to be used in normal (non-advertising) mode.
 * @param image The image to be used on the maximum end of the track (typically the left side of the thumb). The image should be a resizeable UIImage, 'trackHeight' pixels high. When a custom image is set, markers will no longer be displayed. Set to nil to restore the default track images.
 * @param state The UIControlState for which this image will be active.
 */
- (void)setCustomMaximumTrackImage:(UIImage *)image forState:(UIControlState)state;

@end
