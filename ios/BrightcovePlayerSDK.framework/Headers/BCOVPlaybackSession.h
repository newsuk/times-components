//
// BCOVPlaybackSession.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

@class BCOVSessionProviderExtension;
@class BCOVSource;
@class BCOVVideo;


/**
 * The video loaded successfully and is ready to play.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventReady;

/**
 * The video failed to load. The event properties will contain the underlying error
 * keyed by kBCOVPlaybackSessionEventKeyError.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventFail;

/**
 * The video has been set to play mode, and the video will play when it is ready 
 * and has buffer.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventPlay;

/**
 * The video has been set to pause mode, and the video will pause.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventPause;

/**
 * The video failed during playback and was unable to recover, possibly due to a
 * network error. The event properties will contain the underlying error keyed
 * by kBCOVPlaybackSessionEventKeyError.
 *
 * It may be possible to recover from this error once the network has recovered, 
 * by using the -[BCOVPlaybackController resumeVideoAtTime:withAutoPlay:] method.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventFailedToPlayToEndTime;

/**
 * A call to -[BCOVPlaybackController resumeVideoAtTime:withAutoPlay:] was made
 * and the player is attempting to reload the video.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventResumeBegin;

/**
 * A call to -[BCOVPlaybackController resumeVideoAtTime:withAutoPlay:] was made
 * and the player was able to reload the video.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventResumeComplete;

/**
 * A call to -[BCOVPlaybackController resumeVideoAtTime:withAutoPlay:] was made
 * and the player was unable to reload the video.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventResumeFail;

/**
 * The end of the video has been reached. This event will come after any post-roll
 * ads.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventEnd;

/**
 * Playback of the video has stalled. When the video recovers,
 * kBCOVPlaybackSessionLifecycleEventPlaybackRecovered will be sent.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventPlaybackStalled;

/**
 * Playback has recovered after being stalled. This event will come after
 * kBCOVPlaybackSessionLifecycleEventPlaybackStalled.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventPlaybackRecovered;

/**
 * The playback buffer is empty. This will occur when the video initially loads,
 * after a seek occurs, and when playback stops because of a slow or disabled 
 * network. When the buffer is full enough to start playback again,
 * kBCOVPlaybackSessionLifecycleEventPlaybackLikelyToKeepUp will be sent.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventPlaybackBufferEmpty;

/**
 * After becoming empty, this event is sent when the playback buffer has filled
 * enough that it should be able to keep up with playback. This event will come after
 * kBCOVPlaybackSessionLifecycleEventPlaybackBufferEmpty.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventPlaybackLikelyToKeepUp;

/**
 * The session will be disposed of by the player.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventTerminate;

/**
 * A generic error has occurred. The event properties may contain the underlying
 * error keyed by kBCOVPlaybackSessionEventKeyError.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventError;

/**
 * The key for the error in the Event properties.
 */
extern NSString * const kBCOVPlaybackSessionEventKeyError;

/**
 * The key for the didPassCuePoints: payload for the progress interval
 * immediately preceding the cue points for which the payload was received.
 */
extern NSString * const kBCOVPlaybackSessionEventKeyPreviousTime;

/**
 * The key for the didPassCuePoints: payload for the progress interval on or
 * immediately after the cue points for which the payload was received.
 */
extern NSString * const kBCOVPlaybackSessionEventKeyCurrentTime;

/**
 * The key for the didPassCuePoints: payload for the BCOVCuePointCollection of cue
 * points for which the payload was received.
 */
extern NSString * const kBCOVPlaybackSessionEventKeyCuePoints;

/**
 * Error domain for the SDK.
 */
extern NSString * const kBCOVPlaybackSessionErrorDomain;

/**
 * The video failed to load.
 */
extern const NSInteger kBCOVPlaybackSessionErrorCodeLoadFailed;

/**
 * The video failed during playback and was unable to recover, possibly due to a
 * network error.
 */
extern const NSInteger kBCOVPlaybackSessionErrorCodeFailedToPlayToEnd;

/**
 * No playable Source was available for this Video.
 */
extern const NSInteger kBCOVPlaybackSessionErrorCodeNoPlayableSource;

/**
 * A playback session represents the playback of a single video. The session
 * provides a single point of access for everything related to the playback
 * experience for that video: the video and source selected for playback, the
 * player within which the playback occurs, and events that occur during the
 * playback session. Playback sessions are never reused for multiple videos
 * (even separate enqueueings of the same video).
 */
@protocol BCOVPlaybackSession <NSObject>

/**
 * The video whose playback this session represents.
 */
@property (nonatomic, readonly, copy) BCOVVideo *video;

/**
 * The source in `self.video` this session uses to load content.
 */
@property (nonatomic, readonly, copy) BCOVSource *source;

/**
 * The player this session uses to present content.
 */
@property (nonatomic, readonly, strong) AVPlayer *player;

/**
 * The layer that hosts the visible video output.
 */
@property (nonatomic, readonly, strong) AVPlayerLayer *playerLayer;

/**
 * The AVMediaSelectionGroup of audible media selection options of the AVAsset of
 * the AVPlayerItem of the AVPlayer of the current BCOVPlaybackSession.
 *
 * The AVMediaSelectionGroup is unsorted and can contain un-playable options. Use the
 * +playableMediaSelectionOptionsFromArray: class method of AVMediaSeledtionGroup
 * to return the list of playable media options. AVMediaSelectionGroup provides filtering
 * methods to, for example, order the list of options according to the user’s
 * language preferences.
 */
@property (nonatomic, readonly) AVMediaSelectionGroup *audibleMediaSelectionGroup;

/**
 * The selected audible media option. When setting this property, if
 * selectedAudibleMediaOption is not a member of the AVMediaSelectionGroup of the
 * current BCOVPlaybackSession’s AVPlayer, no change in presentation state will
 * occur.
 */
@property (nonatomic, readwrite) AVMediaSelectionOption *selectedAudibleMediaOption;

/**
 * The AVMediaSelectionGroup of legible media selection options of the AVAsset of
 * the AVPlayerItem of the AVPlayer of the current BCOVPlaybackSession.
 *
 * The AVMediaSelectionGroup is unsorted and can contain un-playable options. Use the
 * +playableMediaSelectionOptionsFromArray: class method of AVMediaSelectionGroup
 * to return the list of playable media options. AVMediaSelectionOption provides filtering
 * methods to, for example, exclude forced subtitles from the legible options that are
 * suitable to offer in a selection UI.
 */
@property (nonatomic, readonly) AVMediaSelectionGroup *legibleMediaSelectionGroup;

/**
 * The selected legible media option. When setting this property, if
 * selectedLegibleMediaOption is not a member of the AVMediaSelectionGroup of the
 * current BCOVPlaybackSession’s AVPlayer, no change in presentation state will
 * occur. If selectedLegibleMediaOption is set to nil and the allowsEmptySelecton
 * property of the AVMediaSelectionGroup of the current BCOVPlaybackSession's
 * AVPlayer is YES, all media selection options in the group will be deselected.
 */
@property (nonatomic, readwrite) AVMediaSelectionOption *selectedLegibleMediaOption;

/**
 * The session provider extension for this session. The default value is nil.
 *
 * If a BCOVPlaybackSessionProvider is used that needs to expose plugin specific functionality,
 * this property will return a BCOVSessionProviderExtension.
 */
@property (nonatomic, readonly, strong) BCOVSessionProviderExtension *providerExtension;

/**
 * Selects the audible media option in the audible media selection group that
 * best matches the current AVPlayerItem's automatic selection criteria.
 */
- (void)selectAudibleMediaOptionAutomatically;

/**
 * Selects the legible media option in the legible media selection group which
 * best matches the current AVPlayerItem's automatic selection criteria.
 */
- (void)selectLegibleMediaOptionAutomatically;

/**
 * Returns a descriptive display string for the audible selection option. The
 * display name string is the stringValue of the option appended with the option
 * locale if the locale differs from the stringValue.
 *
 * @param option A specific audio media selection option from the AVMediaSelectionGroup
 */
- (NSString *)displayNameFromAudibleMediaSelectionOption:(AVMediaSelectionOption *)option;

/**
 * Returns a descriptive display string for the legible selection option. The
 * display name string is the stringValue of the option appended with the option
 * locale if the locale differs from the stringValue. Legible option names are
 * further appended with "SDH" when accessibility characteristics are present.
 *
 * @param option A specific legible media selection option from the AVMediaSelectionGroup
 */
- (NSString *)displayNameFromLegibleMediaSelectionOption:(AVMediaSelectionOption *)option;

/**
 * Terminates this playback session, indicating readiness for a new session to
 * be dequeued. A terminated playback session should be discarded immediately.
 *
 * In a typical configuration using a BCOVPlaybackController, there is no need
 * to call this method directly. Methods on the controller are the preferred
 * mechanism for advancing to the next playback session. However, playback
 * session provider configurations which do not use a BCOVPlaybackController
 * may need to invoke this method to advance the queue.
 */
- (void)terminate;

@end


/**
 * A lifecycle event for a playback session.
 */
@interface BCOVPlaybackSessionLifecycleEvent : NSObject <NSCopying>

/**
 * This lifecycle event's type.
 */
@property (nonatomic, readonly) NSString *eventType;

/**
 * Contextual information related to this event instance.
 */
@property (nonatomic, readonly) NSDictionary *properties;

/**
 * Designated initializer. Returns an event with the specified type and properties.
 *
 * @param eventType Type of the event.
 * @param properties Properties of the event
 * @return Initialized event.
 */
- (instancetype)initWithEventType:(NSString *)eventType properties:(NSDictionary *)properties;

/**
 * Determines the equality of the events.
 *
 * @param event Event to check against.
 * @return Returns YES if the events are equal and NO if the events are no equal.
 */
- (BOOL)isEqualToPlaybackSessionLifecycleEvent:(BCOVPlaybackSessionLifecycleEvent *)event;

/**
 * Returns a playback session lifecycle event of the specified type with no
 * properties.
 *
 * @param eventType The event type of the lifecycle event to return.
 * @return The playback session lifecycle event of the specified type.
 */
+ (instancetype)eventWithType:(NSString *)eventType;

@end


/**
 * A BCOVPlaybackSessionProvider will provide plugin specific functionality by
 * adding methods to this object via categories.
 */
@interface BCOVSessionProviderExtension : NSObject

@end
