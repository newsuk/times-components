//
// BCOVCatalogService.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//


#import <Foundation/Foundation.h>

#import <BrightcovePlayerSDK/BCOVCuePoint.h>
#import <BrightcovePlayerSDK/BCOVPlaylist.h>
#import <BrightcovePlayerSDK/BCOVSource.h>
#import <BrightcovePlayerSDK/BCOVVideo.h>

@class BCOVMediaRequestFactory;


/**
 * NSOperation subclass for BCOVCatalogService requests. This operation may
 * only be started once (subsequent attempts to start the operation will have
 * no effect), and will populate either the `result` or `error` property when
 * it completes (but not both).
 */
@interface BCOVCatalogOperation : NSOperation

/**
 * The result of the request this operation performs.
 * This property's value is `nil` until the operation succeeds, at which point
 * it is set to the result of the operation.
 */
@property (nonatomic, readonly, copy) id result;

/**
 * The error that occurred when this operation executed.
 * This property's value is `nil` until the operation fails, at which point it
 * is set to the error that occurred.
 */
@property (nonatomic, readonly, copy) NSError *error;

@end

/**
 * Deprecated: Use BCOVPlaybackService instead.
 *
 * The BCOVCatalogService class provides asynchronous methods for retrieving information
 * about videos and playlists from Brightcove’s Media API services.
 */
DEPRECATED_MSG_ATTRIBUTE("Use BCOVPlaybackService instead")
@interface BCOVCatalogService : NSObject

/**
 * NSURLSession shared across all network calls to the BCOVCatalogService.
 * This object is created when the Catalog Service is initialized.
 * If you wish to use your own NSURLSession you can set it here.
 * If set to nil, the default NSURLSession will be re-created.
 */
@property (nonatomic, strong) NSURLSession *sharedURLSession;

/**
 * The factory used to construct media API requests
 */
@property (nonatomic, strong, readonly) BCOVMediaRequestFactory *requestFactory;

/**
 * Designated initializer, returns an instance initialized with the
 * specified token. The request factory is created using the token provided.
 *
 * To prevent unauthorized access to the metadata in your account, Video Cloud
 * protects access to the API with tokens that you pass as parameters when
 * making API calls. Like other web-based APIs, tokens are generated for you by
 * Video Cloud and must be protected by you.
 *
 * @param token string containing your Video Cloud Media API token.
 * @return an initialized BCOVCatalogService
 */
- (instancetype)initWithToken:(NSString *)token;

/**
 * Returns an initialized instance using the reqest factory provided.
 *
 * To prevent unauthorized access to the metadata in your account, Video Cloud
 * protects access to the API with tokens that you pass as parameters when
 * making API calls. Like other web-based APIs, tokens are generated for you by
 * Video Cloud and must be protected by you.
 *
 * @param requestFactory Request factory used to create requests
 * @return an initialized BCOVCatalogService
 */
- (instancetype)initWithMediaRequestFactory:(BCOVMediaRequestFactory *)requestFactory;

/**
 * Initializes a source from the JSON dictionary. Properties that don't map to
 * first class properties on the source are added to the properties dictionary.
 *
 * @param json Dictionary representing the deserialized source.
 * @return The initialized source.
 */
+ (BCOVSource *)sourceFromJSONDictionary:(NSDictionary *)json;

/**
 * Initializes a cue point from the JSON dictionary. Properties that don't
 * map to first class properties on cue point are added to the properties
 * dictionary.
 *
 * @param json Dictionary representing the deserialized cuepoint.
 * @return The initialized cue point.
 */
+ (BCOVCuePoint *)cuePointFromJSONDictionary:(NSDictionary *)json;

/**
 * Initializes a playlist from the JSON dictionary. Properties that don't
 * map to first class properties on playlist are added to the properties
 * dictionary.
 *
 * @param json Dictionary representing the deserialized playlist.
 * @return The initialized playlist.
 */
+ (BCOVPlaylist *)playlistFromJSONDictionary:(NSDictionary *)json;

/**
 * Initializes a video from the JSON dictionary. Properties that don't
 * map to first class properties on video are added to the properties
 * dictionary.
 *
 * @param json Dictionary representing the deserialized video.
 * @return The initialized video.
 */
+ (BCOVVideo *)videoFromJSONDictionary:(NSDictionary *)json;

@end


@interface BCOVCatalogService (BCOVCatalogOperations)

/**
 * Returns an operation that retrieves a BCOVVideo corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `BCOVVideo *` if the operation succeeds.
 *
 * @param videoID The video ID of the video to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified BCOVVideo.
 */
- (BCOVCatalogOperation *)videoOperationWithVideoID:(NSString *)videoID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves a BCOVVideo corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `BCOVVideo *` if the operation succeeds.
 *
 * @param referenceID The video reference ID of the video to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified BCOVVideo.
 */
- (BCOVCatalogOperation *)videoOperationWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves a BCOVPlaylist corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `BCOVPlaylist *` if the operation succeeds.
 *
 * @param playlistID The playlist ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified BCOVPlaylist.
 */
- (BCOVCatalogOperation *)playlistOperationWithPlaylistID:(NSString *)playlistID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves a BCOVPlaylist corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `BCOVPlaylist *` if the operation succeeds.
 *
 * @param referenceID The playlist reference ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified BCOVPlaylist.
 */
- (BCOVCatalogOperation *)playlistOperationWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves JSON for a video corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `NSDictionary *` if the operation succeeds.
 *
 * @param videoID The video ID of the video to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified video as JSON.
 */
- (BCOVCatalogOperation *)videoDictionaryOperationWithVideoID:(NSString *)videoID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves JSON for a video corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `NSDictionary *` if the operation succeeds.
 *
 * @param referenceID The video reference ID of the video to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified video as JSON.
 */
- (BCOVCatalogOperation *)videoDictionaryOperationWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves JSON for a playlist corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `NSDictionary *` if the operation succeeds.
 *
 * @param playlistID The playlist ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified playlist as JSON.
 */
- (BCOVCatalogOperation *)playlistDictionaryOperationWithPlaylistID:(NSString *)playlistID parameters:(NSDictionary *)parameters;

/**
 * Returns an operation that retrieves JSON for a playlist corresponding to the
 * specified parameters.  Cast this operation's `result` property to a
 * `NSDictionary *` if the operation succeeds.
 *
 * @param referenceID The playlist reference ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to catalog
 * service requests. These values will override the default values if they
 * conflict.
 * @return An operation that retrieves the specified playlist as JSON.
 */
- (BCOVCatalogOperation *)playlistDictionaryOperationWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters;

@end


@interface BCOVCatalogService (BCOVImperativeCallbacks)

/**
 * Retrieves a BCOVPlaylist from the Media API service by its playlist ID.
 *
 * If the Media API returns a standard JSON-formatted error response, the
 * deserialized response will be the callback's error's `userInfo`.
 *
 * If a JSON parse error occurs, the raw NSData response will be included in the
 * callback's error's `userInfo`, keyed by kBCOVCatalogJSONDeserializationErrorRawDataKey.
 *
 * @param playlistID The ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to the Media
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findPlaylistWithPlaylistID:(NSString *)playlistID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVPlaylist *playlist, NSDictionary *jsonResponse, NSError *error))completionHandler;

/**
 * Retrieves a BCOVPlaylist from the Media API service by its reference ID.
 *
 * If the Media API returns a standard JSON-formatted error response, the
 * deserialized response will be the callback's error's `userInfo`.
 *
 * If a JSON parse error occurs, the raw NSData response will be included in the
 * callback's error's `userInfo`, keyed by kBCOVCatalogJSONDeserializationErrorRawDataKey.
 *
 * @param referenceID The reference ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to the Media
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findPlaylistWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVPlaylist *playlist, NSDictionary *jsonResponse, NSError *error))completionHandler;

/**
 * Retrieves a BCOVVideo from the Media API service by its video ID.
 *
 * If the Media API returns a standard JSON-formatted error response, the
 * deserialized response will be the callback's error's `userInfo`.
 *
 * If a JSON parse error occurs, the raw NSData response will be included in the
 * callback's error's `userInfo`, keyed by kBCOVCatalogJSONDeserializationErrorRawDataKey.
 *
 * @param videoID The ID of the video to find.
 * @param parameters Additional NSString query parameters to add to the Media
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findVideoWithVideoID:(NSString *)videoID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVVideo *video, NSDictionary *jsonResponse, NSError *error))completionHandler;

/**
 * Retrieves a BCOVVideo from the Media API service by its reference ID.
 *
 * If the Media API returns a standard JSON-formatted error response, the
 * deserialized response will be the callback's error's `userInfo`.
 *
 * If a JSON parse error occurs, the raw NSData response will be included in the
 * callback's error's `userInfo`, keyed by kBCOVCatalogJSONDeserializationErrorRawDataKey.
 *
 * @param referenceID The reference ID of the video to find.
 * @param parameters Additional NSString query parameters to add to the Media
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findVideoWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVVideo *video, NSDictionary *jsonResponse, NSError *error))completionHandler;

@end


@interface BCOVCuePoint (BCOVCatalogServiceDeprecated)

/**
 * Deprecated method.
 *
 * @param json deprecated
 * @return deprecated.
 */
+ (instancetype)cuePointFromJSONDictionary:(NSDictionary *)json __attribute__((deprecated("Use +BCOVCatalogService cuePointFromJSONDictionary: instead")));

@end


@interface BCOVPlaylist (BCOVCatalogServiceDeprecated)

/**
 * Deprecated method.
 *
 * @param json deprecated
 * @return deprecated.
 */
+ (instancetype)playlistFromJSONDictionary:(NSDictionary *)json __attribute__((deprecated("Use +BCOVCatalogService playlistFromJSONDictionary: instead")));

@end


@interface BCOVSource (BCOVCatalogServiceDeprecated)

/**
 * Deprecated method.
 *
 * @param json deprecated
 * @return deprecated.
 */
+ (instancetype)sourceFromJSONDictionary:(NSDictionary *)json __attribute__((deprecated("Use +BCOVCatalogService sourceFromJSONDictionary: instead")));

@end


@interface BCOVVideo (BCOVCatalogServiceDeprecated)

/**
 * Deprecated method.
 *
 * @param json deprecated
 * @return deprecated.
 */
+ (instancetype)videoFromJSONDictionary:(NSDictionary *)json __attribute__((deprecated("Use +BCOVCatalogService videoFromJSONDictionary: instead")));

@end
