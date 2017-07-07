//
// BCOVPlaybackServiceRequestFactory.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>


/**
 * The BCOVPlaybackServiceRequestFactory class provides methods for creating
 * requests for videos from Brightcove’s Playback API.
 */
@interface BCOVPlaybackServiceRequestFactory : NSObject

/**
 * Videocloud Account Id.
 */
@property (nonatomic, copy, readonly) NSString *accountId;

/**
 * Returns an initialized instance with the specified policy. The base URL
 * string used by the returned instance is https://edge.api.brightcove.com/playback/v1 .
 *
 * @param accountId A Video Cloud account. Must not be nil.
 * @param policyKey A Video Cloud CMS policy. Must not be nil.
 * @return The initialized BCOVPlaybackServiceRequestFactory.
 */
- (instancetype)initWithAccountId:(NSString *)accountId policyKey:(NSString *)policyKey;

/**
 * Returns an initialized instance with the specified token, account, and base URL string.
 *
 * @param accountId A Video Cloud account.
 * @param policyKey A Video Cloud CMS policy.
 * @param baseURLStr A string URL to the API.
 * @return The initialized BCOVPlaybackServiceRequestFactory.
 */
- (instancetype)initWithAccountId:(NSString *)accountId policyKey:(NSString *)policyKey  baseURLStr:(NSString *)baseURLStr NS_DESIGNATED_INITIALIZER;

/**
 * Constructs a request for a playlist by the playlist id.
 *
 * @param playlistId Id of the playlist to request.
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set.
 * @return Built NSURLRequest that can be used to fetch the playlist.
 */
- (NSURLRequest *)requestForPlaylistWithPlaylistID:(NSString *)playlistId parameters:(NSDictionary *)parameters;

/**
 * Constructs a request for a playlist by the reference id.
 *
 * @param referenceId Reference id of the playlist to request.
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set.
 * @return Built NSURLRequest that can be used to fetch the playlist.
 */
- (NSURLRequest *)requestForPlaylistWithReferenceID:(NSString *)referenceId parameters:(NSDictionary *)parameters;

/**
 * Constructs a request for a video by the video id.
 *
 * @param videoId Id of the video to request.
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set.
 * @return Built NSURLRequest that can be used to fetch the video.
 */
- (NSURLRequest *)requestForVideoWithVideoID:(NSString *)videoId parameters:(NSDictionary *)parameters;

/**
 * Constructs a request for a video by the reference id.
 *
 * @param referenceId Reference id of the video to request.
 * @param parameters parameters that will be added as URL parameters to the request.
 * These parameters will override any default parameters that had been set.
 * @return Built NSURLRequest that can be used to fetch the video.
 */
- (NSURLRequest *)requestForVideoWithReferenceID:(NSString *)referenceId parameters:(NSDictionary *)parameters;

@end
