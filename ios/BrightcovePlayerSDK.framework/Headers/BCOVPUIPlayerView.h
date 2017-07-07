//
// BCOVPUIPlayerView.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <UIKit/UIKit.h>

#import <BrightcovePlayerSDK/BCOVPlaybackController.h>

@class BCOVAd;
@class BCOVPUIPlayerView;
@class BCOVPUIAdControlView;
@class BCOVPUIBasicControlView;


/**
 * States of the screen mode.
 */
typedef NS_ENUM(NSUInteger, BCOVPUIScreenMode) {

    /** Default mode **/
    BCOVPUIScreenModeNormal,

    /** Present full screen **/
    BCOVPUIScreenModeFull
};

/**
 * Method for launching browser for Learn More button
 */
typedef NS_ENUM(NSUInteger, BCOVPUILearnMoreButtonBrowserStyle) {
    
    /** Default style launches a URL in the default system browser external to the application **/
    BCOVPUILearnMoreButtonUseExternalBrowser,
    
    /** Launch URLs in an in-app browser.
     In iOS 9 this is a SFSafariViewController.
     In iOS 8 this is a WKWebView inside a UIViewController.
     In iOS 7 this is a UIWebView inside a UIViewController.
     */
    BCOVPUILearnMoreButtonUseInAppBrowser
    
};

/**
 * Method for viewing and controlling the Video 360 experience
 */
typedef NS_ENUM(NSUInteger, BCOVPUIVideo360NavigationMethod) {
    
    /** View orientation tracking is turned off.
     Use this if you want to control view orientation
     in the playback controller yourself.
     */
    BCOVPUIVideo360NavigationNone,

    /** Tracking is handled by UI gestures on the player view.
     */
    BCOVPUIVideo360NavigationFingerTracking,
    
    /** The device's motion will be used to set the
     view orientation.
     */
    BCOVPUIVideo360NavigationDeviceMotionTracking,
    
};


/**
 * Conform to this protocol to receive information for regarding the BCOVPUIPlayerView.
 */
@protocol BCOVPUIPlayerViewDelegate <NSObject>
@optional

/**
 * Called before the playerView is begins transitioning to a new screen mode.
 *
 * @param playerView The player view that is transitioning.
 * @param screenMode The screen mode that will be transitioned to.
 */
- (void)playerView:(BCOVPUIPlayerView *)playerView willTransitionToScreenMode:(BCOVPUIScreenMode)screenMode;

/**
 * Called when the playerView is finished transitioning to a new screen mode.
 *
 * @param playerView The player view that is transitioning.
 * @param screenMode The screen mode that was transitioned to.
 */
- (void)playerView:(BCOVPUIPlayerView *)playerView didTransitionToScreenMode:(BCOVPUIScreenMode)screenMode;

/**
 * Called when the playerView controls faded out.
 *
 * @param playerView The player view that manages the controls.
 * @param controlsFadingView The controls fading view that faded out.
 */
- (void)playerView:(BCOVPUIPlayerView *)playerView controlsFadingViewDidFadeOut:(UIView *)controlsFadingView;

/**
 * Called when the playerView controls faded in.
 *
 * @param playerView The player view that manages the controls.
 * @param controlsFadingView The controls fading view that faded in.
 */
- (void)playerView:(BCOVPUIPlayerView *)playerView controlsFadingViewDidFadeIn:(UIView *)controlsFadingView;

/**
 * This delegate method will be called when the learn more button has
 * been pressed and the clickthrough URL assosiated with the ad will be opened
 * in the in-app browser.
 *
 * @param ad The ad whose clickthrough URL will open in the in-app browser.
 */
- (void)willOpenInAppBrowserWithAd:(BCOVAd *)ad;

/**
 * This delegate method will be called when the learn more button has
 * been pressed and the clickthrough URL assosiated with the ad opened
 * in the in-app browser.
 *
 * @param ad The ad whose clickthrough URL opened in the in-app browser.
 */
- (void)didOpenInAppBrowserWithAd:(BCOVAd *)ad;

/**
 * This delegate method will be called when the in-app browser
 * will be closed.
 *
 * @param ad The ad whose clickthrough URL will close in the in-app browser.
 */
- (void)willCloseInAppBrowserWithAd:(BCOVAd *)ad;

/**
 * This delegate method will be called when the in-app browser
 * has closed.
 *
 * @param ad The ad whose clickthrough URL closed from the in-app browser.
 */
- (void)didCloseInAppBrowserWithAd:(BCOVAd *)ad;

/**
 * This optional delegate method will be called when the clickthrough url
 * will open the in the system browser.
 *
 * @param ad The ad whose clickthrough URL will be opened in the system browser.
 */
- (void)willOpenExternalBrowserWithAd:(BCOVAd *)ad;

/**
 * This optional delegate method will be called when the app has returned to
 * the foreground after the clickthrough url was opened in the system browser.
 *
 * @param ad The ad whose clickthrough URL was opened in the system browser.
 */
- (void)didReturnFromExternalBrowserWithAd:(BCOVAd *)ad;

/**
 * Delegate methods related to Video 360
 */

/**
 * This optional delegate method will be called when the Video 360 button
 * in the control bar is tapped. This is used to switch your current UIViewController
 * orientation to landscape when using the BCOVVideo360ProjectionStyleVRGoggles projection.
 *
 * @param navigationMethod The new navigation method of type BCOVPUIVideo360NavigationMethod
 */
- (void)didSetVideo360NavigationMethod:(BCOVPUIVideo360NavigationMethod)navigationMethod
                       projectionStyle:(BCOVVideo360ProjectionStyle)projectionStyle;

@end


/**
 * Optional configuration for a player view.
 */
@interface BCOVPUIPlayerViewOptions : NSObject

/**
 * This view controller will be used for features that require a presenting view
 * controller, like full screen mode or the closed-caption popover.
 */
@property (nonatomic, weak) UIViewController *presentingViewController;

/**
 * The time in seconds to jump back when the jump back button is pressed.
 * Defaults to 10 seconds.
 */
@property (nonatomic, assign) NSTimeInterval jumpBackInterval;

/**
 * The time in seconds since the last touch before fading the controls.
 * Defaults to 3 seconds.
 * See `-resetHideControlsIntervalTimer` for related usage.
 */
@property (nonatomic, assign) NSTimeInterval hideControlsInterval;

/**
 * The time in seconds for animating the hiding of the controls.
 * Defaults to .5 seconds.
 */
@property (nonatomic, assign) NSTimeInterval hideControlsAnimationDuration;

/**
 * The time in seconds for animating the showing of the controls.
 * Defaults to .2 seconds.
 */
@property (nonatomic, assign) NSTimeInterval showControlsAnimationDuration;


/**
 * The method to use for opening web views when the Learn More button is tapped.
 * Defaults to BCOVPUILearnMoreButtonUseExternalBrowser.
 */
@property (nonatomic, assign) BCOVPUILearnMoreButtonBrowserStyle learnMoreButtonBrowserStyle;

/**
 * Options related to Video 360
 */

/**
 * The minimum allowable value for the pan setting when finger tracking
 * Defaults to negative infinity.
 */
@property (nonatomic, assign) float panMin;

/**
 * The maximum allowable value for the pan setting when finger tracking
 * Defaults to positive infinity.
 */
@property (nonatomic, assign) float panMax;

/**
 * Determines speed with which a pan gesture fling decays.
 * Defaults to 1.0. Larger values cause the fling to decay more slowly.
 * Smaller values cause the fling to stop quickly.
 * A value of 0.0 stops panning immediately after touch-up.
 */
@property (nonatomic, assign) float panInertia;

/**
 * The minimum allowable value for the tilt setting when finger tracking
 * Defaults to negative infinity.
 */
@property (nonatomic, assign) float tiltMin;

/**
 * The maximum allowable value for the tilt setting when finger tracking
 * Defaults to positive infinity.
 */
@property (nonatomic, assign) float tiltMax;

/**
 * The minimum allowable value for the zoom setting when finger tracking
 * Defaults to 1.0.
 */
@property (nonatomic, assign) float zoomMin;

/**
 * The maximum allowable value for the zoom setting when finger tracking
 * Defaults to 1.0.
 */
@property (nonatomic, assign) float zoomMax;

/**
 * The minimum allowable value for the rotate setting when finger tracking
 * Defaults to 0.0.
 */
@property (nonatomic, assign) float rotateMin;

/**
 * The maximum allowable value for the pan setting when finger tracking
 * Defaults to 0.0.
 */
@property (nonatomic, assign) float rotateMax;

@end


/**
 * View for displaying video and controls.
 */
@interface BCOVPUIPlayerView : UIView

/**
 * The playback controller associated with this player view.
 */
@property (nonatomic, weak) id<BCOVPlaybackController> playbackController;

/**
 * A delegate that conforms to BCOVPUIPlayerViewDelegate.
 */
@property (nonatomic, weak) id<BCOVPUIPlayerViewDelegate> delegate;

/**
 * View that holds the video content.
 */
@property (nonatomic, weak, readonly) UIView *contentContainerView;

/**
 * View intended to contain views that overlay the video content.
 */
@property (nonatomic, weak, readonly) UIView *contentOverlayView;

/**
 * View that contains all controls, static or fading.
 * Set this view's alpha to zero to hide all controls.
 */
@property (nonatomic, weak, readonly) UIView *controlsContainerView;

/**
 * View intended to contain control elements that should not be
 * faded out/in.
 */
@property (nonatomic, weak, readonly) UIView *controlsStaticView;

/**
 * View intended to contain control elements that should be
 * faded out/in.
 */
@property (nonatomic, weak, readonly) UIView *controlsFadingView;

/**
 * The visible state of the controlsFadingView.
 * Can be set manually to temporarily show or hide the controls.
 */
@property (nonatomic) BOOL controlsFadingViewVisible;

/**
 * View intended to contain views that should overlay all other views.
 */
@property (nonatomic, weak, readonly) UIView *overlayView;

/**
 * The controlsView holds the playback controls, and is a subview of the
 * controlsFadingView view.
 */
@property (nonatomic, readonly) BCOVPUIBasicControlView *controlsView;

/**
 * Advertising controls view. This view is a subview of the controlsStaticView.
 */
@property (nonatomic, readonly) BCOVPUIAdControlView *adControlsView;

/**
 * Video 360 Settings
 * The method for controlling the view orientation
 * of a 360 video in the player view.
 */
@property (nonatomic, readwrite) BCOVPUIVideo360NavigationMethod video360NavigationMethod;

/**
 * Initializes a BCOVPUIPlayerView using default options with the given
 * BCOVPlaybackController.
 *
 * @param playbackController The playback controller used by the player view. This
 * must not be nil.
 *
 * @return Fully initialized player view.
 */
- (instancetype)initWithPlaybackController:(id<BCOVPlaybackController>)playbackController;

/**
 * Initializes a BCOVPUIPlayerView using the provided BCOVPUIPlayerViewOptions 
 * and BCOVPlaybackController.
 *
 * @param playbackController The playback controller used by the player view. This
 * must not be nil.
 * @param options The options for the player view. If nil, default options will be used.
 *
 * @return Fully initialized player view.
 */
- (instancetype)initWithPlaybackController:(id<BCOVPlaybackController>)playbackController options:(BCOVPUIPlayerViewOptions *)options;

/**
 * Initializes a BCOVPUIPlayerView using the provided BCOVPUIPlayerViewOptions, 
 * BCOVPlaybackController and customized BCOVPUIBasicControlView.
 *
 * @param playbackController The playback controller used by the player view. This
 * must not be nil.
 * @param options The options for the player view. If nil, default options will be used.
 * @param controlsView The controls view to use in the player view.  If nil, default
 * controls view will be used.
 *
 * @return Fully initialized player view.
 */
- (instancetype)initWithPlaybackController:(id<BCOVPlaybackController>)playbackController options:(BCOVPUIPlayerViewOptions *)options controlsView:(BCOVPUIBasicControlView *)controlsView NS_DESIGNATED_INITIALIZER;

/**
 * Performs screen transition to the designated mode.
 *
 * @param screenMode The screen mode to transition to.
 */
- (void)performScreenTransitionWithScreenMode:(BCOVPUIScreenMode)screenMode;

/**
 * Resets the timer used to keep track of when to hide the controls.
 * If you implement your own controls, you can call this after the user
 * taps on them to prevent the controls from hiding too soon.
 */
- (void)resetHideControlsIntervalTimer;

@end
