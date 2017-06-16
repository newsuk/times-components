//
// BCOVBasicSessionProvider.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>

#import <BrightcovePlayerSDK/BCOVPlaybackSessionProvider.h>

@class BCOVBasicSessionProviderOptions;
@class BCOVSource;
@class BCOVVideo;


/**
 * Each time a new video is ready to be loaded into a playback session, this
 * block is called and the video is passed in. The block must return a source,
 * which will be used to configure the AVPlayer of the playback session.
 * If the block returns nil, the session provider will not deliver this session
 * and will move on to the next session.
 *
 * @param video The video from which a source is chosen.
 * @return The source to be used by the playback session.
 */
typedef BCOVSource *(^BCOVBasicSessionProviderSourceSelectionPolicy)(BCOVVideo *video);


/**
 * The basic playback session provider provides core functionality to yield
 * playback sessions corresponding to an enumeration of BCOVVideo objects.
 */
@interface BCOVBasicSessionProvider : NSObject <BCOVPlaybackSessionProvider>

/**
 * Returns a basic session provider initialized with the specified options.
 *
 * @param options The options for the session provider to return.
 * @return A basic playback session provider configured with the specified
 * options.
 */
- (instancetype)initWithOptions:(BCOVBasicSessionProviderOptions *)options;

@end


/**
 * The basic source selection policy decides
 * which source to select from a BCOVVideo object.
 */
@interface BCOVBasicSourceSelectionPolicy : NSObject <NSCopying>

/**
 * Select the first video in HLS with the specified scheme.
 * If no such source is found, the first HLS source with any scheme is returned.
 * If no HLS sources are present, the first MP4 is returned.
 * If none of the above is found, the first source of any kind is returned.
 *
 * This is the default source selection policy (using kBCOVSourceURLSchemeHTTPS
 * as the scheme).
 *
 * @param scheme The preferred scheme (kBCOVSourceURLSchemeHTTP or
 * kBCOVSourceURLSchemeHTTPS) of the source URL.
 * @return A source selection policy that prefers HLS with the specified scheme.
 */
+ (BCOVBasicSessionProviderSourceSelectionPolicy)sourceSelectionHLSWithScheme:(NSString *)scheme;
/**
 * Select the first video in HLS, regardless of scheme.
 * If no HLS source is found, select the first source with a deliveryType of
 * "MP4". If neither is found, the first source of any kind is returned.
 *
 * @return A source selection policy that prefers HLS over MP4.
 */
+ (BCOVBasicSessionProviderSourceSelectionPolicy)sourceSelectionHLS;

@end


/**
 * The basic session loading policy decides when to load sessions.
 */
@interface BCOVBasicSessionLoadingPolicy : NSObject <NSCopying>

/**
 * Returns a session loading policy that doesn't preload upcoming sessions.
 */
+ (instancetype)sessionPreloadingNever;

/**
 * Returns a session loading policy that preloads an upcoming session when the
 * previous session reaches certain percentage of progress.
 * 
 * @param progressPercentage A NSUInteger between 0 and 100.
 * @return A session loading policy that preloads an upcoming session when the
 * previous session reaches certain percentage of progress. If progressPercentage
 * is not between 0 and 100, a `+[sessionPreloadingNever]` will be returned.
 */
+ (instancetype)sessionPreloadingWithProgressPercentage:(NSUInteger)progressPercentage;

@end

@interface BCOVBasicSessionLoadingPolicy (Unavailable)

- (instancetype)init __attribute__((unavailable("Use `+[BCOVBasicSessionLoadingPolicy sessionPreloadingNever] or +[BCOVBasicSessionLoadingPolicy sessionPreloadingWithProgressPercentage:]` instead.")));

@end


/**
 * Optional configuration for basic session providers.
 */
@interface BCOVBasicSessionProviderOptions : NSObject

/**
 * The default policy selects the first source with a deliveryType of "HLS". If no
 * source is found, it falls back to first source with a deliveryType of
 * "MP4". If neither are found, it returns nil.
 */
@property (nonatomic, copy) BCOVSource *(^sourceSelectionPolicy)(BCOVVideo *video);

/**
 * The session loading policy that preloads an upcoming session when the
 * previous session reaches certain percentage of progress.
 */
@property (nonatomic, copy) BCOVBasicSessionLoadingPolicy *sessionPreloadingPolicy;

@end
