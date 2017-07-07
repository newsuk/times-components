//
// BCOVAdvertising.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>
#import <CoreMedia/CoreMedia.h>

@protocol BCOVPlaybackController;
@protocol BCOVPlaybackSession;


/**
 *  Sent when the content video will be paused to play back an ad.
 */
extern NSString * const kBCOVPlaybackSessionLifecycleEventWillPauseForAd;


/**
 * This object represents a sequence of ads intended to be viewed in sequence,
 * at the same point in the video.
 */
@interface BCOVAdSequence : NSObject

/**
 * The begin time of the sequence.
 */
@property (nonatomic, readonly) CMTime beginTime;

/**
 * The duration of the sequence.
 */
@property (nonatomic, readonly) CMTime duration;

/**
 * The ads that make up the sequence.
 */
@property (nonatomic, readonly, copy) NSArray *ads;

/**
 * The properties of the sequence.
 */
@property (nonatomic, readonly, copy) NSDictionary *properties;

/**
 * This is the designated initializer. It creates an ad sequence.
 *
 * @param ads The ads that make up the sequence.
 * @param properties The properties of the ad sequence.
 * @return An initialized ad sequence.
 */
- (instancetype)initWithAds:(NSArray *)ads properties:(NSDictionary *)properties;

/**
 * Returns YES if `adSequence` is equivalent to this instance.
 *
 * @param adSequence The ad sequence to test for equivalence with this instance.
 * @return Whether `adSequence` is equivalent to this instance.
 */
- (BOOL)isEqualToAdSequence:(BCOVAdSequence *)adSequence;

@end

/**
 * This object represents an ad.
 */
@interface BCOVAd : NSObject

/**
 * The title of the ad.
 */
@property (nonatomic, readonly, copy) NSString *title;

/**
 * The id of the ad.
 */
@property (nonatomic, readonly, copy) NSString *adId;

/**
 * The begin time of the ad.
 */
@property (nonatomic, readonly) CMTime beginTime;

/**
 * The duration of the ad.
 */
@property (nonatomic, readonly) CMTime duration;

/**
 * The properties of the ad.
 */
@property (nonatomic, readonly, copy) NSDictionary *properties;

/**
 * This is the designated initializer. It creates an ad.
 *
 * @param title The title of the ad.
 * @param adId The id of the ad.
 * @param beginTime The time in the video in which the ad will play.
 * @param duration The duration of the ad.
 * @param properties The properties of the ad.
 * @return An initialized ad.
 */
- (instancetype)initWithTitle:(NSString *)title adId:(NSString *)adId beginTime:(CMTime)beginTime duration:(CMTime)duration properties:(NSDictionary *)properties NS_DESIGNATED_INITIALIZER;

/**
 * Returns YES if `ad` is equivalent to this instance.
 *
 * @param ad The ad to test for equivalence with this instance.
 * @return Whether `ad` is equivalent to this instance.
 */
- (BOOL)isEqualToAd:(BCOVAd *)ad;

@end


/**
 * Conform to this protocol to receive basic ad information for each session.
 */
@protocol BCOVPlaybackControllerAdsDelegate <NSObject>

@optional

/**
 * Called when playback enters a new ad sequence within a playback session.
 *
 * @param controller The playback controller in which this transition occurred.
 * @param session The playback session within which the ad transition occurred.
 * @param adSequence The ad sequence being entered.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didEnterAdSequence:(BCOVAdSequence *)adSequence;

/**
 * Called when playback exits an ad sequence within a playback session.
 *
 * @param controller The playback controller in which this transition occurred.
 * @param session The playback session within which the ad transition occurred.
 * @param adSequence The ad sequence being exited.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didExitAdSequence:(BCOVAdSequence *)adSequence;

/**
 * Called when playback enters a new ad within a playback session.
 *
 * @param controller The playback controller in which this transition occurred.
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being entered.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didEnterAd:(BCOVAd *)ad;

/**
 * Called when playback exits an ad within a playback session.
 *
 * @param controller The playback controller in which this transition occurred.
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being exited.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didExitAd:(BCOVAd *)ad;

/**
 * Called with the playback session's ad playback progress.
 *
 *
 * @param controller The playback controller in which an add is progressing.
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad that is progressing.
 * @param progress The progress time of the ad.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session ad:(BCOVAd *)ad didProgressTo:(NSTimeInterval)progress;

/**
 * Called when an ad paused.
 *
 * @param controller The playback controller in which this transition occurred.
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being paused.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didPauseAd:(BCOVAd *)ad;

/**
 * Called when an ad resumed.
 *
 * @param controller The playback controller in which this transition occurred.
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being resumed.
 */
- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didResumeAd:(BCOVAd *)ad;

@end


/**
 * Conform to this protocol to receive basic ad information for each session.
 */
@protocol BCOVPlaybackSessionAdsConsumer <NSObject>

@optional

/**
 * Called when playback enters a new ad sequence within a playback session.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param adSequence The ad sequence being entered.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didEnterAdSequence:(BCOVAdSequence *)adSequence;

/**
 * Called when playback exits an ad sequence within a playback session.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param adSequence The ad sequence being exited.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didExitAdSequence:(BCOVAdSequence *)adSequence;

/**
 * Called when playback exists an ad within a playback session.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being entered.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didEnterAd:(BCOVAd *)ad;

/**
 * Called when playback enters a new ad within a playback session.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being exited.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didExitAd:(BCOVAd *)ad;

/**
 * Called with the playback session's ad playback progress.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad that is progressing.
 * @param progress The progress time of the ad.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session ad:(BCOVAd *)ad didProgressTo:(NSTimeInterval)progress;

/**
 * Called when an ad paused.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being paused.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didPauseAd:(BCOVAd *)ad;

/**
 * Called when an ad resumed.
 *
 * @param session The playback session within which the ad transition occurred.
 * @param ad The ad being resumed.
 */
- (void)playbackSession:(id<BCOVPlaybackSession>)session didResumeAd:(BCOVAd *)ad;

@end


@interface BCOVAdSequence (Unavailable)

/**
 * Private method.
 */
- (instancetype)init __attribute__((unavailable("Use `-[BCOVAdSequence initWithAds:properties:]` instead.")));

@end

@interface BCOVAd (Unavailable)

/**
 * Private method.
 */
- (instancetype)init __attribute__((unavailable("Use `-[BCOVAd initWithTitle:adId:beginTime:duration:properties:]` instead.")));

@end
