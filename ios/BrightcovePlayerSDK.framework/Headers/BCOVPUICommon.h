//
// BCOVPUICommon.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <UIKit/UIKit.h>
#import <CoreMedia/CoreMedia.h>


/**
 * Enumerations and values used throughout the PlayerUI.
 */

/**
 * Tags for buttons used by various BCOV control elements.
 */
typedef NS_ENUM(NSInteger, BCOVPUIViewTag) {

    /** Tag for unknown button. */
    BCOVPUIViewTagUnknown,

    /**  Tag for playback button. */
    BCOVPUIViewTagButtonPlayback        = 1,

    /** Tag for jump back button. */
    BCOVPUIViewTagButtonJumpBack        = 2,

    /** Tag for closed caption button. */
    BCOVPUIViewTagButtonClosedCaption   = 3,

    /** Tag for the screen mode (fullscreen) button. */
    BCOVPUIViewTagButtonScreenMode      = 4,

    /** Tag for the current (elapsed time) label. */
    BCOVPUIViewTagLabelCurrentTime      = 5,

    /** Tag for the time separator label. */
    BCOVPUIViewTagLabelTimeSeparator    = 6,

    /** Tag for the duration label. */
    BCOVPUIViewTagLabelDuration         = 7,

    /** Tag for the progress slider. */
    BCOVPUIViewTagSliderProgress        = 8,

    /** Tag for the external route (airplay) button */
    BCOVPUIViewTagViewExternalRoute     = 9,

    /** Tag for the "go to live" button. */
    BCOVPUIViewTagButtonLive            = 10,
    
    /** Tag for an empty control box. */
    BCOVPUIViewTagViewEmpty             = 11,
    
    /** Tag for the "Your video will resume..." button. */
    BCOVPUIViewTagButtonAdPodCountdown  = 12,
    
    /** Tag for the "Learn More" button. */
    BCOVPUIViewTagButtonLearnMore       = 13,
    
    /** Tag for the "Skip Ad" countdown button. */
    BCOVPUIViewTagButtonSkipAdCountdown = 14,
    
    /** Tag for the "Skip" button. */
    BCOVPUIViewTagViewButtonSkip        = 15,
    
    /** Tag for the Video 360 button. */
    BCOVPUIViewTagButtonVideo360        = 16,
    
    /** Tag that signifies the end of our reserved range. */
    BCOVPUIViewTagReservedEnd           = 200
};


/**
 * Type of video.
 */
typedef NS_ENUM(NSUInteger, BCOVPUIVideoType) {

    /** Video type can not be determined. */
    BCOVPUIVideoTypeUnknown,

    /** Video on demand (has a duration). */
    BCOVPUIVideoTypeVOD,

    /** Video has no duration, and a limited seekable range. */
    BCOVPUIVideoTypeLive,

    /** Video has no duration, and a large seekable range. */
    BCOVPUIVideoTypeLiveDVR
};


/**
 * Distinct Icon types.
 */
typedef NS_ENUM(NSUInteger, BCOVPUIButtonIcon) {

    /** Play icon. */
    BCOVPUIButtonIconPlay,

    /** Pause icon. */
    BCOVPUIButtonIconPause,

    /** Jump back icon. */
    BCOVPUIButtonIconJumpBack,

    /** Zoom in icon. */
    BCOVPUIButtonIconZoomIn,

    /** Zoom out icon. */
    BCOVPUIButtonIconZoomOut,

    /** Closed Caption icon. */
    BCOVPUIButtonIconClosedCaption,

    /** External Route (airplay) icon */
    BCOVPUIButtonIconExternalRoute,
    
    /** Video 360 Options icon */
    BCOVPUIButtonIconVideo360,
    
    /** Reserved icon. */
    BCOVPUIButtonIconReserved,
};


@interface BCOVPUICommon : NSObject

/**
 * Icon font used by the PlayerUI.
 */
+ (UIFont *)iconFont;

/**
 * Icon font used by the PlayerUI at specified font size.
 *
 * @param fontSize Size of font to return.
 *
 * @return Font at specified size.
 */
+ (UIFont *)iconFontWithSize:(CGFloat)fontSize;

/**
 * Returns the unicode to be used with +iconFont or +iconFontWithSize:
 * for the given icon.
 *
 * @param buttonIcon The icon to return unicode for.
 *
 * @return Unicode string for the icon.
 */
+ (NSString *)fontUnicodeForButtonIcon:(BCOVPUIButtonIcon)buttonIcon;

/**
 * Color used by the playback controls in their normal state, UIControlStateNormal.
 * Red:255.0/255.0 green:255/255.0 blue:255.0/255.0 alpha:1.0
 */
+ (UIColor *)controlColorForNormalState;

/**
 * Color used by the playback controls in their normal state, UIControlStateSelected.
 * Red:255.0/255.0 green:255/255.0 blue:255.0/255.0 alpha:1.0
 */
+ (UIColor *)controlColorForSelectedState;

/**
 * Color used by the playback controls in their normal state, UIControlStateHighlighted.
 * Red:128.0/255.0 green:128/255.0 blue:128.0/255.0 alpha:1.0
 */
+ (UIColor *)controlColorForHighlightedState;

/**
 * Color used by the playback controls in their normal state, UIControlStateDisabled.
 * Red:128.0/255.0 green:128/255.0 blue:128.0/255.0 alpha:0.8
 */
+ (UIColor *)controlColorForDisabledState;

/**
 * Color used by the Live button to indicate the stream is currently live.
 * Red:85.0/255.0 green:154.0/255.0 blue:66.0/255.0 alpha:1.0
 */
+ (UIColor *)liveViewTitleColorForLive;

/**
 * Color used by the progress slider maximum track tint.
 * Red:140.0/255.0 green:143.0/255.0 blue:140.0/255.0 alpha:1.0
 */
+ (UIColor *)progressSliderMaximumTrackTintColor;

/**
 * Color used by the progress slider minimum track tint.
 * Red:214.0/255.0 green:36.0/255.0 blue:133.0/255.0 alpha:1.0
 */
+ (UIColor *)progressSliderMinimumTrackTintColor;

/**
 * Color used by the progress slider buffered tint.
 * Red:255.0/255.0 green:255.0/255.0 blue:255.0/255.0 alpha:0.8
 */
+ (UIColor *)progressSliderBufferProgressTintColor;

/**
 * Returns the default image for the volume view.
 *
 * @param fontSize The size of the font to create the image with.
 * @param color The color to use.
 *
 * @return The image.
 */
+ (UIImage *)imageForVolumeViewWithFontSize:(CGFloat)fontSize color:(UIColor *)color;

/**
 * Default font size used by labels.
 * 16.
 */
+ (CGFloat)defaultFontSizeForLabel;

/**
 * Default font size used by buttons.
 * 22.
 */
+ (CGFloat)defaultFontSizeForButton;

@end
