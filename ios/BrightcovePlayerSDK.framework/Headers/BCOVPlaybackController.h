//
// BCOVPlaybackController.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <AVFoundation/AVFoundation.h>
#import <CoreMedia/CoreMedia.h>
#import <UIKit/UIKit.h>

#import <BrightcovePlayerSDK/BCOVAdvertising.h>

@class BCOVPlaybackSessionLifecycleEvent;
@class BCOVPlaylist;
@class BCOVSource;
@class BCOVVideo;

@protocol BCOVMutableAnalytics;
@protocol BCOVPlaybackController;
@protocol BCOVPlaybackControllerBasicDelegate;
@protocol BCOVPlaybackControllerDelegate;
@protocol BCOVPlaybackSession;
@protocol BCOVPlaybackSessionBasicConsumer;
@protocol BCOVPlaybackSessionConsumer;

/**
 * Enumeration defining the valid values that may be set for the
 * BCOVVideo360ViewProjection's sourceFormat
 */
typedef NS_ENUM(NSInteger, BCOVVideo360SourceFormat) {
    
    BCOVVideo360SourceFormatNone  = 0,
    
    BCOVVideo360SourceFormatEquirectangular  = 1,
    
};

/**
 * Enumeration defining the valid values that may be set for the
 * BCOVVideo360ProjectionStyle's projectionStyle
 */
typedef NS_ENUM(NSInteger, BCOVVideo360ProjectionStyle) {
    
    BCOVVideo360ProjectionStyleNormal  = 0,
    
    BCOVVideo360ProjectionStyleVRGoggles  = 1,
    
};

// The approximate vertical angle of view when the view orientation's zoom is 1.0.
// Set to 75 degrees
extern const CGFloat kBCOVVideo360BaseAngleOfView;


// Position of virtual camera when viewing Video 360 streams
@interface BCOVVideo360ViewProjection : NSObject

// Horizontal angle of view in degrees
@property (nonatomic) CGFloat pan;

// Vertical angle of view in degrees
@property (nonatomic) CGFloat tilt;

// Magnification of view; 1.0 corresponds to 75 degrees
// Default value is 1.0
@property (nonatomic) CGFloat zoom;

// Angle of rotation in degrees about the virtual camera's longitudinal axis.
// Normally zero; commonly used to correct camera tilt.
@property (nonatomic) CGFloat roll;

/**
 * Horizontal offset of the rendered 360 video in the view.
 * When using a split screen VR goggles view, the x offset is
 * applied to the left view, and the negative of the offset is
 * applied to the right view. This can be used to adjust the view to
 * fit different device sizes.
 * Defaults to 0.0.
 */
@property (nonatomic, assign) CGFloat xOffset;

/**
 * Vertical offset of the rendered 360 video in the view.
 * Defaults to 0.0.
 */
@property (nonatomic, assign) CGFloat yOffset;

@property (nonatomic) BCOVVideo360SourceFormat sourceFormat;

@property (nonatomic) BCOVVideo360ProjectionStyle projectionStyle;

/**
 * Convenience method to return a new instance of a BCOVVideo360ViewProjection object
 */
+ (instancetype)viewProjection;

@end

/**
 * BCOVPlaybackController's Options Dictionary Keys
 */

/**
 * Key in the playback controller's options dictionary for enabling or disabling
 * buffer optimization in the AVPlayer.
 * This value is only used on iOS 10 and later.
 * Valid values:
 *   0: Buffer optimization is turned off. Set this value if you want to set
 *      the AVPlayerItem's preferredForwardBufferDuration property yourself.
 *   1: Buffer optimization is turned on. The AVPlayerItem's
 *      preferredForwardBufferDuration will be adjusted at 5-second intervals
 *      such that the forward buffer is approximately equal to the current time
 *      viewed. The actual value is limited to specific minimum and maximum
 *      values, currently 30 and 90 seconds.
 * Buffer optimziation is turned on by default.
 */
extern NSString * const kBCOVBufferOptimizerMethodKey;

/**
 * Key in the playback controller's options dictionary for setting the
 * minimum duration of the forward playback buffer used by the
 * buffer optimization method. The minimum allowable value is 1 second, though
 * it's more realistic to set a minimum value of around 15 to 30 seconds for
 * optimal playback.
 * This value may only be set if the kBCOVBufferOptimizerMethodKey is set to 1.
 * The default value is 30.
 */
extern NSString * const kBCOVBufferOptimizerMinimumDurationKey;

/**
 * Key in the playback controller's options dictionary for setting the
 * maximum duration of the forward playback buffer used by the
 * buffer optimization method. There is no maximum allowable value, but keep in
 * mind that the AVPlayer will only use this setting as a recommendation,
 * and it can use a larger or smaller value depending on available memory
 * and other factors.
 * This value may only be set if the kBCOVBufferOptimizerMethodKey is set to 1.
 * The default value is 90.
 */
extern NSString * const kBCOVBufferOptimizerMaximumDurationKey;

/**
 * Key in the playback controller's options dictionary for setting the
 * AVPlayerViewController compatibility mode. Setting this dictionary value
 * will prevent the BCOVPlaybackSession from automatically associating its 
 * internal AVPlayerLayer with an external AVPlayerLayer.
 */
extern NSString * const kBCOVAVPlayerViewControllerCompatibilityKey;

/**
 * Enumeration defining the valid values that may be set for the
 * kBCOVBufferOptimizerMethodKey key
 */
typedef NS_ENUM(NSInteger, BCOVBufferOptimizerMethod) {
    
    /** No buffer optimization. */
    BCOVBufferOptimizerMethodNone       = 0,
    
    /** Default buffer optimization. */
    BCOVBufferOptimizerMethodDefault    = 1
    
};

/**
 * A string used to mark an application certificate as the default for
 * all video cloud accounts. This indicates that the associated application
 * certificate should be used if a more specific identifier cannot be found.
 * See `-addFairPlayApplicationCertificate:identifier:` for details.
 */
extern NSString * const kBCOVDefaultFairPlayApplicationCertificateIdentifier;


/**
 * Typedef for a view strategy given to a playback controller to construct its
 * `view` property.
 *
 * A view strategy is simply a block that takes two parameters, a UIView and a
 * BCOVPlaybackController, and returns a UIView. It is used to
 * compose UIView objects to create a view hierarchy that will ultimately be
 * accessible from a BCOVPlaybackController's `view` property. To construct
 * your own view strategy, simply implement a block conforming to this signature
 * and within the block, assemble the view hierarchy as you require. For
 * example, you might want to insert custom controls into the view strategy
 * you use when creating a playback controller:
 *
 *   BCOVPlaybackControllerViewStrategy vs = ^ UIView * (UIView *videoView, id<BCOVPlaybackController> playbackController) {
 *
 *     videoView.frame = myFrame;
 *
 *     MyControlsView *controls = [[MyControlsView alloc] initWithVideoView:videoView];
 *     [playbackController addSessionConsumer:controls];
 *
 *     return controls;
 *
 *   };
 *
 * This example view strategy, when given to a playback controller, will
 * instruct the controller to return the MyControlsView instead of whatever
 * view it would otherwise have returned from its `view` property (that view
 * is the `videoView` parameter to the block). Note how this code adds the
 * MyControlsView object as a session consumer to the session consumer container
 * that is also passed into the block. Not every object will need to be added
 * as a session consumer, but for controls or other views that care about the
 * current playback session, it probably makes sense to conform to the
 * BCOVPlaybackSessionConsumer protocol and pass it in, so as to be able to take
 * action when a new session is delivered.
 *
 * @param view The "original" view that is to be composed by the view this
 * block will return. This will typically be or contain a video playback view.
 * @param playbackController A playback controller for any session consumers that
 * are created within the block and need to be added, so as to receive
 * notification of new playback sessions.
 * @return The UIView which the playback controller should use as its `view`.
 */
typedef UIView *(^BCOVPlaybackControllerViewStrategy)(UIView *view, id<BCOVPlaybackController> playbackController);


/**
 * Protocol adopted by objects that provide playback functionality.
 *
 * Implementations of this formal protocol must support its standard playback
 * operations, but may extend the API to perform additional functions specific
 * to their feature set.
 */
@protocol BCOVPlaybackController <NSObject>

/**
 * Delegate for this BCOVPlaybackController.
 */
@property (nonatomic, assign) id<BCOVPlaybackControllerDelegate> delegate;

/**
 * Whether to advance to the next playback session when its previous playback
 * session sends kBCOVPlaybackSessionLifecycleEventEnd. If this event is sent
 * more than once by a playback session, the subsequent sends are ignored.
 *
 * Defaults to NO.
 *
 * @return True if this queue should send the next session when the previous
 * session sends kBCOVPlaybackSessionLifecycleEventEnd.
 */
@property (nonatomic, assign, getter = isAutoAdvance) BOOL autoAdvance;

/**
 * Whether to begin playing a new playback session as soon as it is received.
 *
 * Defaults to NO.
 *
 * @return Whether to begin playback as soon as a new session is received.
 */
@property (nonatomic, assign, getter = isAutoPlay) BOOL autoPlay;

/**
 * Returns a UIView to present playback in a view hierarchy. The view is reused
 * across all playback sessions sent to this controller.
 *
 * @return A UIView to present playback in a view hierarchy.
 */
@property (nonatomic, readonly, strong) UIView *view;

/**
 * A dictionary of key-value pairs used to set options in the playback controller.
 * When setting options, you should preserve the current options in the dictionary
 * by making a mutable copy of the existing dictionary, setting your value, and
 * then assigning your new dictionary to this property.
 * May be nil.
 *
 * @return The current options dictionary used by the playback controller.
 */
@property (nonatomic, readwrite, copy) NSDictionary *options;

/**
 * Returns the playback controller's analytics object.
 */
@property (nonatomic, readonly, copy) id<BCOVMutableAnalytics> analytics;

/**
 * Disables ad playback which otherwise might occur after a forward -seekTo:.
 * The intended use is, for example, to resume video playback when an app has
 * quit and relaunched; the app can seek to a saved time and ads which
 * have been previously viewed will not play again. Set adsDisabled to
 * YES, then call one of the -seekToTime: methods, and finally set adsDisabled
 * to NO in the -seekToTime: completion handler. The default value of
 * adsDisabled is NO.
 *
 * Note that unless the BCOVPlaybackSessionLifecycleEvent
 * kBCOVPlaybackSessionLifecycleEventReady has been received, the -seekTo:
 * completion handler will never be called. For that reason, it is recommended
 * that you call -seekTo: from within the
 * -playbackController:playbackSession:didReceiveLifecycleEvent delegate method
 * for the kBCOVPlaybackSessionLifecycleEventReady event.
 */
@property (nonatomic, readwrite) BOOL adsDisabled;

/**
 * Allow playback of audio when the app has switched to the background.
 *
 * Default value is NO.
 */
@property (nonatomic, readwrite) BOOL allowsBackgroundAudioPlayback;

/**
 * Set this to YES if picture-in-picture becomes active, and NO when it deactivates.
 *
 * This only needs to be toggled if allowsBackgroundAudioPlayback is set to
 * YES. If allowsBackgroundAudioPlayback is set to NO, this property
 * can be ignored.
 *
 * Default value is NO.
 */
@property (nonatomic, readwrite, assign, getter=isPictureInPictureActive) BOOL pictureInPictureActive;

/**
 * Set shutter to YES to hide the current player view behind an opaque
 * black shutter view. Set shutter active to NO to make the shutter view
 * transparent to reveal the player view.
 */

@property (nonatomic, readwrite) BOOL shutter;

/**
 * Set the shutterFadeTime to the duration, in seconds, of the shutter state
 * transition animation. The default value is zero.
 */

@property (nonatomic, readwrite) NSTimeInterval shutterFadeTime;

/**
 * Position of virtual camera when viewing Video 360 streams
 * Default values are:
 * pan: 0 degrees
 * tilt: 0 degrees
 * zoom: 1.0
 * roll: 0 degrees
 */
@property (nonatomic, readwrite, copy) BCOVVideo360ViewProjection *viewProjection;

/**
 * Registers a session consumer with a container, to be notified of new
 * sessions. Added consumers will be retained by this container. If a session
 * already existed in the container at the time of subscription, the specified
 * consumer will be sent the `-didAdvanceToPlaybackSession:` message.
 *
 * @param consumer The session consumer being added to the container.
 */
- (void)addSessionConsumer:(id<BCOVPlaybackSessionConsumer>)consumer;

/**
 * Removes a session consumer from the container. The effect of this is that
 * the container releases its ownership of the consumer, and the consumer will
 * no longer be given new sessions to consume.
 *
 * @param consumer The session consumer being removed from the container.
 */
- (void)removeSessionConsumer:(id<BCOVPlaybackSessionConsumer>)consumer;

/**
 * Specifies that the current playback session's player, as well the player of
 * any subsequent sessions (until this property is set to a different value),
 * should have external playback enabled.
 *
 * @param allowsExternalPlayback Whether players should have external playback
 * enabled.
 */
- (void)setAllowsExternalPlayback:(BOOL)allowsExternalPlayback;

/**
 * Instructs this instance to advance to the next playback session. This has no
 * effect if there are no further playback sessions. Note that the next
 * playback session may be delivered asynchronously.
 */
- (void)advanceToNext;

/**
 * Plays the content video. On first play, cue points at position kBCOVCuePointPositionTypeBefore
 * will be fired, and the video will play using -[AVPlayer play].
 *
 * This default behaviour may be overridden when using plugins. For more information on
 * plugin overrides, refer to BCOVSessionProviderExtension category methods in the plugin for
 * a method like abc_play:.
 */
- (void)play;

/**
 * Pauses the content video. This is a proxy call to -[AVPlayer pause].
 *
 * This default behaviour may be overridden when using plugins. For more information on
 * plugin overrides, refer to BCOVSessionProviderExtension category methods in the plugin for
 * a method like abc_pause:.
 */
- (void)pause;

/**
 * Proxy call to `-[AVPlayer seekToTime:toleranceBefore:toleranceAfter:completionHandler:]`
 * with a tolerance of .1 seconds. Do not call this method until after receiving
 * kBCOVPlaybackSessionLifecycleEventReady event.
 *
 * This default behaviour may be overridden when using plugins. For more information on
 * plugin overrides, refer to BCOVSessionProviderExtension category methods in the plugin for
 * a method like abc_seekToTime:completionHandler:.
 *
 * @param time              Time to move to.
 * @param completionHandler The block to invoke when the seek operation has either been completed or been interrupted.
 */
- (void)seekToTime:(CMTime)time completionHandler:(void (^)(BOOL finished))completionHandler;

/**
 * Proxy call to `-[AVPlayer seekToTime:toleranceBefore:toleranceAfter:completionHandler:]`
 * Do not call this method until after receiving kBCOVPlaybackSessionLifecycleEventReady event.
 *
 * This default behaviour may be overridden when using plugins. For more information on
 * plugin overrides, refer to BCOVSessionProviderExtension category methods in the plugin for
 * a method like abc_seekToTime:completionHandler:.
 *
 * @param time              Time to move to.
 * @param toleranceBefore   Allowable tolerance before the seek target.
 * @param toleranceAfter    Allowable tolerance before the seek target.
 * @param completionHandler The block to invoke when the seek operation has either been completed or been interrupted.
 */
- (void)seekToTime:(CMTime)time toleranceBefore:(CMTime)toleranceBefore toleranceAfter:(CMTime)toleranceAfter completionHandler:(void (^)(BOOL finished))completionHandler;

/**
 * Proxy call to `-[AVPlayer seekToTime:completionHandler:]` Sets the current
 * playback time to the specified time and executes the specified block when the
 * seek operation has either been completed or been interrupted. Ads scheduled
 * before the seek time will not be played. Ads scheduled before the seek time
 * are not considered to have been played and any user seeks to an earlier
 * playback time will cause those ads to play.
 *
 * `seekWithoutAds:completionHandler:` is for the purpose of resuming playback
 * after a client app has been quit and re-launched. It is recommended that
 * playbackController.autoPlay be set to NO when using seekWithoutAds.
 *
 * Do not call this method until after receiving the
 * kBCOVPlaybackSessionLifecycleEventReady event.
 *
 * @param time              Time to move to.
 * @param completionHandler The block to invoke when the seek operation has either been completed or been interrupted.
*/

- (void)seekWithoutAds:(CMTime)time completionHandler:(void (^)(BOOL finished))completionHandler;

/**
 * Instructs this instance to reinitialize the current session. If there is
 * no current session, this method has no effect. Once this method is called,
 * it will send the kBCOVPlaybackSessionLifecycleEventResumeBegin event to
 * indicate reinitializing has begun. If an error occurs anywhere
 * during the reinitialization, this method will send the 
 * kBCOVPlaybackSessionLifecycleEventResumeFail event. If the reinitialization
 * succeeds, the kBCOVPlaybackSessionLifecycleEventResumeComplete will be
 * sent.
 *
 * Do not call this method a second time until you have received either 
 * kBCOVPlaybackSessionLifecycleEventResumeFail or kBCOVPlaybackSessionLifecycleEventResumeComplete
 * from the first call.
 *
 * @param time Seek time to set after reinitialization.
 * @param autoPlay Automatically play new session once it is restarted.
 */
- (void)resumeVideoAtTime:(CMTime)time withAutoPlay:(BOOL)autoPlay;

/**
 * Specifies the source from which this instance will draw its upcoming videos
 * for playback. The first playback session will be sent as soon as it becomes
 * available, replacing any current playback session. Playback sessions may be
 * delivered asynchronously.
 *
 * @param videos The source of BCOVVideo objects from which this instance
 * should construct playback sessions.
 */
- (void)setVideos:(id<NSFastEnumeration>)videos;

/**
 * Instructs this instance to resume ad playback. This method has no effect when
 * an ad is already playing, or if no advertising component has been integrated
 * with this playback controller.
 */
- (void)resumeAd;

/**
 * Instructs this instance to pause ad playback. This method has no effect when
 * an ad is already paused, or if no advertising component has been integrated
 * with this playback controller.
 */
- (void)pauseAd;

#pragma mark - FairPlay DRM

/**
 * This method is used to add a FairPlay application certificate to the
 * playback controller's list of available FairPLay application certificates.
 * Certificates will be retained for the life of the playback controller.
 *
 * If you are using Dynamic Delivery, application certificates are retrieved
 * automatically by the FairPlay plugin, so this method is not needed.
 * You can, however, use this method to pre-load your application certificate
 * to speed up playback of the first FairPlay-encrypted video.
 * Certificates are stored and re-used for subsequent videos.
 *
 *  @param applicationCertificateData
 *                  The FairPlay application certificate in an NSData object.
 *                  If set to nil, any existing application certificate for the
 *                  given identifier will be removed.
 *  @param identifier
 *                  A string used to locate the application certificate.
 *                  This string may not be nil.
 *                  - For Dynamic Delivery, the identifier must be the URL
 *                  that was used to retrieve this certificate.
 *                  - For legacy Video Cloud accounts, this should be set to
 *                  kBCOVDefaultFairPlayApplicationCertificateIdentifier
 *                  to apply to all accounts.
 *                  - If you are using multiple legacy Video Cloud accounts,
 *                  set this param to the acount ID.
 */
- (void)addFairPlayApplicationCertificate:(NSData *)applicationCertificateData
                               identifier:(NSString *)identifier;

@end


/**
 * Conform to this protocol to receive basic playback information for each video in
 * addition to advertising.
 */
@protocol BCOVPlaybackSessionConsumer <BCOVPlaybackSessionBasicConsumer, BCOVPlaybackSessionAdsConsumer>

@end


/**
 * Conform to this protocol to receive basic playback information for each session.
 */
@protocol BCOVPlaybackSessionBasicConsumer<NSObject>
@optional
/**
 * Called when the controller advances to a new playback session,
 * which happens when `-advanceToNext` is called. When added as a session 
 * consume on a playback controller, this method is called with the most 
 * recently advanced-to playback session (where applicable).
 *
 * @param session The playback session that was advanced.
 */
- (void)didAdvanceToPlaybackSession:(id<BCOVPlaybackSession>)session;

/**
 * Called when a playback session's duration is updated. When added as a session
 * consume on a playback controller, this method is called with the most 
 * recently updated duration for the session. A session duration can change as 
 * the media playback continues to load, as it is refined with more precise 
 * information.
 *
 * @param session The playback session whose duration changed.
 * @param duration The most recently updated session duration.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didChangeDuration:(NSTimeInterval)duration;

/**
 * Called when a playback session's external playback active status is updated.
 * When a delegate is set on a playback controller, this method is called with the
 * current external playback active status for the session.
 *
 * @param session The playback session whose external playback status changed.
 * @param externalPlaybackActive Whether external playback is active.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didChangeExternalPlaybackActive:(BOOL)externalPlaybackActive;

/**
 * Called when a session's playhead passes cue points registered with its video.
 * This will occur regardless of whether the playhead passes the cue point time
 * for standard progress (playback), or seeking (forward or backward) through
 * the media. When a delegate is set on a playback controller, this method will
 * only be called for future cue point events (any events that have already
 * occurred will not be reported).
 *
 * If multiple cue points are registered to a time or times that fall between
 * the "previous time" and "current time" for a cue point event, all cue points
 * after the "previous time" and before or on "current time" will be included
 * in the cue point collection. Put differently, multiple cue points at the
 * same time are aggregated into a single cue point event whose collection will
 * contain all of those cue points. The most likely scenario in which this
 * would happen is when seeking across a time range that includes multiple cue
 * points (potentially at different times) -- this will result in a single cue
 * point event whose previous time is the point at which seek began, whose
 * current time is the destination of the seek, and whose cue points are all of
 * the cue points whose time fell within that range.
 *
 * The cuePointInfo dictionary will contain the following keys and values for
 * each cue point event:
 *
 *   kBCOVPlaybackSessionEventKeyPreviousTime: the progress interval immediately
 *     preceding the cue points for which this event was received.
 *   kBCOVPlaybackSessionEventKeyCurrentTime: the progress interval on or
 *     immediately after the cue points for which this event was received.
 *   kBCOVPlaybackSessionEventKeyCuePoints: the BCOVCuePointCollection of cue
 *     points for which this event was received.
 *
 * @param session The playback session whose cue points were passed.
 * @param cuePointInfo A dictionary of information about the cue point event.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didPassCuePoints:(NSDictionary *)cuePointInfo;

/**
 * Called with the playback session's playback progress. As the session's
 * media plays, this method is called periodically with the latest progress
 * interval. When a delegate is set on a playback controller, this method will
 * only be called with progress information that has not yet occurred.
 *
 * @param session The playback session making progress.
 * @param progress The time interval of the session's current playback progress.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didProgressTo:(NSTimeInterval)progress;

/**
 * Called when the end of the video playlist has been reached, after the
 * the last video (including post-rolls) has played to the end.
 * Only called when `autoAdvance` is set to YES on the playback controller.
 *
 * @param playlist The list of BCOVVideo objects that were played. Do not assume that this is an NSArray.
 */
- (void)didCompletePlaylist:(id<NSFastEnumeration>)playlist;

/**
 * Called when a playback session receives a lifecycle event. This method is
 * called only for lifecycle events that occur after the delegate is set
 * (previous lifecycle events will not be buffered/delivered to the delegate).
 *
 * The lifecycle event types are listed along with the
 * BCOVPlaybackSessionLifecycleEvent class.
 *
 * @param session The playback session whose lifecycle events were received.
 * @param lifecycleEvent The lifecycle event received by the session.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didReceiveLifecycleEvent:(BCOVPlaybackSessionLifecycleEvent *)lifecycleEvent;

/**
 * Called when a playback session's seekable ranges is updated. When added as a 
 * session consume on a playback controller, this method is called with the most
 * recently updated seekable ranges for the session. A session seekable ranges 
 * can change as the media playback continues to load.
 *
 * @param session The playback session whose seekable ranges changed.
 * @param seekableRanges An array of NSValue about the most recently updated 
 * session seekableRanges.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didChangeSeekableRanges:(NSArray *)seekableRanges;

@end


/**
 * Conform to this protocol to receive basic playback information for each video in
 * addition to advertising.
 */
@protocol BCOVPlaybackControllerDelegate <BCOVPlaybackControllerBasicDelegate, BCOVPlaybackControllerAdsDelegate>

@end


/**
 * Conform to this protocol to receive basic playback information for each session.
 */
@protocol BCOVPlaybackControllerBasicDelegate <NSObject>

@optional

/**
 * Called when the controller advances to a new playback session,
 * which happens when `-advanceToNext` is called. When a delegate is set
 * on a playback controller, this method is called with the most recently
 * advanced-to playback session (where applicable).
 *
 * @param controller The playback controller receiving the new session.
 * @param session The playback session that was advanced.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller didAdvanceToPlaybackSession:(id<BCOVPlaybackSession>)session;

/**
 * Called when a playback session's duration is updated. When a delegate is set
 * on a playback controller, this method is called with the most recently updated
 * duration for the session. A session duration can change as the media playback
 * continues to load, as it is refined with more precise information.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param session The playback session whose duration changed.
 * @param duration The most recently updated session duration.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didChangeDuration:(NSTimeInterval)duration;

/**
 * Called when a playback session's external playback active status is updated.
 * When a delegate is set on a playback controller, this method is called with the
 * current external playback active status for the session.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param session The playback session whose external playback status changed.
 * @param externalPlaybackActive Whether external playback is active.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didChangeExternalPlaybackActive:(BOOL)externalPlaybackActive;

/**
 * Called when a session's playhead passes cue points registered with its video.
 * This will occur regardless of whether the playhead passes the cue point time
 * for standard progress (playback), or seeking (forward or backward) through
 * the media. When a delegate is set on a playback controller, this method will
 * only be called for future cue point events (any events that have already 
 * occurred will not be reported).
 *
 * If multiple cue points are registered to a time or times that fall between
 * the "previous time" and "current time" for a cue point event, all cue points
 * after the "previous time" and before or on "current time" will be included
 * in the cue point collection. Put differently, multiple cue points at the
 * same time are aggregated into a single cue point event whose collection will
 * contain all of those cue points. The most likely scenario in which this
 * would happen is when seeking across a time range that includes multiple cue
 * points (potentially at different times) -- this will result in a single cue
 * point event whose previous time is the point at which seek began, whose
 * current time is the destination of the seek, and whose cue points are all of
 * the cue points whose time fell within that range.
 *
 * The cuePointInfo dictionary will contain the following keys and values for
 * each cue point event:
 *
 *   kBCOVPlaybackSessionEventKeyPreviousTime: the progress interval immediately
 *     preceding the cue points for which this event was received.
 *   kBCOVPlaybackSessionEventKeyCurrentTime: the progress interval on or
 *     immediately after the cue points for which this event was received.
 *   kBCOVPlaybackSessionEventKeyCuePoints: the BCOVCuePointCollection of cue
 *     points for which this event was received.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param session The playback session whose cue points were passed.
 * @param cuePointInfo A dictionary of information about the cue point event.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didPassCuePoints:(NSDictionary *)cuePointInfo;

/**
 * Called with the playback session's playback progress. As the session's
 * media plays, this method is called periodically with the latest progress
 * interval. When a delegate is set on a playback controller, this method will
 * only be called with progress information that has not yet occurred.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param session The playback session making progress.
 * @param progress The time interval of the session's current playback progress.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didProgressTo:(NSTimeInterval)progress;

/**
 * Called when the end of the video playlist has been reached, after the
 * the last video (including post-rolls) has played to the end.
 * Only called when `autoAdvance` is set to YES on the playback controller.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param playlist The list of BCOVVideo objects that were played. Do not assume that this is an NSArray.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller didCompletePlaylist:(id<NSFastEnumeration>)playlist;

/**
 * Called when a playback session receives a lifecycle event. This method is 
 * called only for lifecycle events that occur after the delegate is set
 * (previous lifecycle events will not be buffered/delivered to the delegate).
 *
 * The lifecycle event types are listed along with the
 * BCOVPlaybackSessionLifecycleEvent class.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param session The playback session whose lifecycle events were received.
 * @param lifecycleEvent The lifecycle event received by the session.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didReceiveLifecycleEvent:(BCOVPlaybackSessionLifecycleEvent *)lifecycleEvent;

/**
 * Called when a playback session's seekable ranges is updated. When a delegate 
 * is set on a playback controller, this method is called with the most recently
 * updated seekable ranges for the session. A session seekable ranges can change
 * as the media playback continues to load.
 *
 * @param controller The playback controller to which this instance serves as delegate.
 * @param session The playback session whose seekable ranges changed.
 * @param seekableRanges An array of NSValue about the most recently updated
 * session seekableRanges.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didChangeSeekableRanges:(NSArray *)seekableRanges;

@end


/**
 * When these properties are modified, the changes will take effect on the next
 * delivered session. To apply these properties to all sessions, modify them before
 * the call to -[BCOVPlaybackController setVideos:].
 */
@protocol BCOVMutableAnalytics <NSObject>

/**
 * This property will set the Account ID value for Brightcove Analytics.
 * Setting this property will also replace the accountId value on any video that is 
 * retrieved through a Brightcove Media API request.
 */
@property (nonatomic, copy) NSString *account;

/**
 * This property must be a URI with a valid structure and must contain
 * an authority.
 * The default value for this property, if it is not overridden, will be
 * "bcsdk://" followed by the bundle identifier.
 *
 * Please refer to http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax
 * for more information on and examples of URI syntax.
 *
 * In particular, a destination without a hierarchical part (e.g. just a scheme)
 * is considered invalid, as is any value without a scheme.
 */
@property (nonatomic, copy) NSString *destination;

/**
 * This property must be a URI with a valid structure and must contain an
 * authority.
 * The default value is nil.
 *
 * Please refer to http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax
 * for more information on and examples of URI syntax.
 *
 * In particular, a source without a hierarchical part (e.g. just a scheme)
 * is considered invalid, as is any value without a scheme.
 */
@property (nonatomic, copy) NSString *source;

/**
 * This property toggles client side unique identifier generation. If enabled,
 * the sdk will identify uniques using the device's vendor identifier. If 
 * disabled, the sdk will provide no uniques value and analytics will rely on
 * server-side driven heuristics to determine uniques.
 *
 * The default value is YES.
 */
@property (nonatomic, assign, getter=isUniqueIdentifierEnabled) BOOL uniqueIdentifierEnabled;

@end
