//
// BCOVVideo.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>

@class BCOVCuePointCollection;
@class BCOVSource;
@protocol BCOVMutableVideo;


/**
 * Account Id for video to be used for billing/analytics.
 */
extern NSString * const kBCOVVideoPropertyKeyAccountId;

/**
 * Name for video to be used for billing/analytics.
 */
extern NSString * const kBCOVVideoPropertyKeyName;

/**
 * Name for video to be used for billing/analytics.
 */
extern NSString * const kBCOVVideoPropertyKeyId;


/**
 * A video in the Brightcove Player SDK ecosystem. Brightcove organizes content
 * into entities called videos, which may have zero or more sources containing
 * information specific to accessing the content. The video provides a container
 * for referencing these sources in the aggregate, and a place for metadata
 * about the video or the collection of sources in the form of properties. Also,
 * a video may have a cue point collection, which is a set of cue points that
 * describe specific locations in the video's content timeline.
 */
@protocol BCOVVideo <NSObject>

/**
 * The cue points associated to this video. These cue points apply equally to
 * the content at each of this video's sources.
 */
@property (nonatomic, readonly, copy) BCOVCuePointCollection *cuePoints;

/**
 * Metadata or properties related to this video or its sources in the aggregate.
 */
@property (nonatomic, readonly, copy) NSDictionary *properties;

/**
 * The sources which comprise the actual destinations at which this video's
 * content can be accessed.
 */
@property (nonatomic, readonly, copy) NSArray *sources;

/**
 * Returns a modified version of this source. Because BCOVVideo objects
 * are immutable, an entirely new BCOVVideo must be created even if only
 * a single change is needed. Therefore, this method provides a convenient way
 * to obtain a temporary mutable copy of this instance and modify it (within
 * `updateBlock`).
 *
 * Do not attempt to save a reference to the mutable video passed to
 * `updateBlock`, as the behavior of doing this is undefined. Instead, make
 * whatever modifications are necessary in the block and then capture the video
 * object returned from this method.
 *
 * @param updateBlock A block which is passed a mutable copy of this video.
 * @return The copy of this video modified by `updateBlock`.
 */
- (instancetype)update:(void (^)(id<BCOVMutableVideo> mutableVideo))updateBlock;

@end


/**
 * Sub-protocol of BCOVVideo, used only in its `-update` method.
 */
@protocol BCOVMutableVideo <BCOVVideo>

@property (nonatomic, readwrite, copy) BCOVCuePointCollection *cuePoints;
@property (nonatomic, readwrite, copy) NSDictionary *properties;
@property (nonatomic, readwrite, copy) NSArray *sources;

@end


/**
 * Implementation of the BCOVVideo protocol.
 */
@interface BCOVVideo : NSObject <BCOVVideo, NSCopying>

/**
 * Constructs a new video with the specified sources, cue points, and
 * properties.
 *
 * @param sources The sources of this video.
 * @param cuePoints The cue points associated to this video.
 * @param properties The metadata or properties associated to this video.
 * @return A new video with the specified sources, cue points, and properties.
 */
- (instancetype)initWithSources:(NSArray *)sources cuePoints:(BCOVCuePointCollection *)cuePoints properties:(NSDictionary *)properties;

/**
 * Constructs a new video with a single specified source, the specified cue
 * points, and the specified properties.
 *
 * @param source The sole source of this video.
 * @param cuePoints The cue points associated to this video.
 * @param properties The metadata or properties associated to this video.
 * @return A new video with a single source, as well as the specified cue points
 * and properties.
 */
- (instancetype)initWithSource:(BCOVSource *)source cuePoints:(BCOVCuePointCollection *)cuePoints properties:(NSDictionary *)properties;

/**
 * Returns YES if `video` is equivalent to this instance.
 *
 * @param video The video to test for equivalence with this instance.
 * @return Whether `video` is equivalent to this instance.
 */
- (BOOL)isEqualToVideo:(BCOVVideo *)video;

/**
 * Returns a new video with a single source containing the specified URL.
 *
 * @param url The URL of the source to be created and associated to the new
 * video.
 * @return A new video with a source containing the specified URL.
 */
+ (BCOVVideo *)videoWithURL:(NSURL *)url;

/**
 * Returns a new video with a single source containing the specified URL
 * and a delivery method as kBCOVSourceDeliveryHLS.
 *
 * @param url The URL of the source to be created and associated to the new
 * video.
 * @return A new video with a source containing the specified URL.
 */
+ (BCOVVideo *)videoWithHLSSourceURL:(NSURL *)url;

/**
 * Returns a new video with a single source containing the specified URL.
 *
 * @param url The URL of the source to be created and associated to the new
 * video.
 * @param deliveryMethod The delivery method for this source. See BCOVSource for options.
 * @return A new video with a source containing the specified URL.
 */
+ (BCOVVideo *)videoWithURL:(NSURL *)url deliveryMethod:(NSString *)deliveryMethod;

@end

