//
// BCOVMediaRequestFactory.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>


/**
 * BCOVMediaRequestFactory provides convenience methods for creating requests
 * that access the Brightcove Media APIs.
 */
DEPRECATED_ATTRIBUTE
@interface BCOVMediaRequestFactory : NSObject

/**
 * The default collection of video properties to request.
 */
@property (nonatomic, copy) NSArray *defaultVideoFields;

/**
 * Returns an initialized instance with the specified token. The base URL
 * string used by the returned instance is https://api.brightcove.com/services/library .
 *
 * To prevent unauthorized access to the metadata in your account, Video Cloud
 * protects access to the API with tokens that you pass as parameters when
 * making API calls. Like other web-based APIs, tokens are generated for you by
 * Video Cloud and must be protected by you. Tokens must have URL access if
 * they are used to retrieve content for playback.
 *
 * @param token A Video Cloud Media API token.
 * @return The initialized BCOVMediaRequestFactory.
 */
- (instancetype)initWithToken:(NSString *)token;

/**
 * Returns an initialized instance with the specified token and base URL string.
 * The base URL string must include a complete URL scheme, host, and path.
 *
 * To prevent unauthorized access to the metadata in your account, Video Cloud
 * protects access to the API with tokens that you pass as parameters when
 * making API calls. Like other web-based APIs, tokens are generated for you by
 * Video Cloud and must be protected by you. Tokens must have URL access if
 * they are used to retrieve content for playback.
 *
 * @param token A Video Cloud Media API token.
 * @param baseURLString A string containing the base URL to which Media API
 * parameters should be appended in URLs returned by this instance.
 * @return The initialized BCOVMediaRequestFactory.
 */
- (instancetype)initWithToken:(NSString *)token baseURLString:(NSString *)baseURLString;

/**
 * Constructs a request for a playlist by the playlist id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param playlistId id of the playlist to request
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestPlaylistWithPlaylistID:(NSString *)playlistId;

/**
 * Constructs a request for a playlist by the playlist id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param playlistId id of the playlist to request
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestPlaylistWithPlaylistID:(NSString *)playlistId parameters:(NSDictionary *)parameters;

/**
 * Constructs a request for a playlist by the reference id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param referenceId reference id of the playlist to request
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestPlaylistWithReferenceID:(NSString *)referenceId;

/**
 * Constructs a request for a playlist by the reference id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param referenceId reference id of the playlist to request
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestPlaylistWithReferenceID:(NSString *)referenceId parameters:(NSDictionary *)parameters;

/**
 * Constructs a request for a video by the video id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param videoId id of the video to request
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestVideoWithVideoID:(NSString *)videoId;

/**
 * Constructs a request for a video by the video id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param videoId id of the video to request
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestVideoWithVideoID:(NSString *)videoId parameters:(NSDictionary *)parameters;

/**
 * Constructs a request for a video by the video id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param referenceId reference id of the video to request
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestVideoWithReferenceID:(NSString *)referenceId;

/**
 * Constructs a request for a video by the reference id. This request will include
 * the video_fields specified by defaultVideoFields.
 *
 * @param referenceId reference id of the video to request
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set
 * @return built request that can be used to hit the Brightcove Media API
 */
- (NSURLRequest *)requestVideoWithReferenceID:(NSString *)referenceId parameters:(NSDictionary *)parameters;

@end

