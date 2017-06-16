//
// BCOVPlaybackService.h
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

@class BCOVPlaybackServiceRequestFactory;

/**
 * Errors associated with Playback API requests.
 */
typedef NS_ENUM(NSInteger, BCOVPlaybackServiceErrorCode)
{
    /**
     * No error.
     */
    BCOVPlaybackServiceErrorNoError,

    /**
     * Error Code that indicates there was an error connecting to the Playback
     * API. Check the error.userInfo key NSUnderlyingErrorKey for the actual
     * connection error.
     */
    BCOVPlaybackServiceErrorCodeConnectionError,

    /**
     * Error Code that indicates there was an error parsing the response as JSON.
     * If the request returned any data, that raw NSData will be included in the
     * userInfo by key kBCOVPlaybackServiceErrorKeyRawResponseData. Check the
     * error.userInfo key NSUnderlyingErrorKey for the actual JSON deserialization error.
     */
    BCOVPlaybackServiceErrorCodeJSONDeserializationError,

    /**
     * Error Code that indicates there was an error returned by the API. Check the
     * error.userInfo key kBCOVPlaybackServiceErrorKeyAPIErrors for an NSArray
     * of errors returned by the API and key kBCOVPlaybackServiceErrorKeyAPIHTTPStatusCode
     * to find the status code returned.
     */
    BCOVPlaybackServiceErrorCodeAPIError
};


/**
 * Error domain for BCOVPlaybackService.
 */
extern NSString * const kBCOVPlaybackServiceErrorDomain;

/**
 * Key for NSError.userInfo for errors with domain kBCOVPlaybackServiceErrorDomain
 * and errorCode BCOVPlaybackServiceErrorCodeJSONDeserializationError. This is the
 * raw response data. This may not exist in error.userInfo.
 */
extern NSString * const kBCOVPlaybackServiceErrorKeyRawResponseData;

/**
 * Key for NSError.userInfo for errors with domain kBCOVPlaybackServiceErrorDomain
 * and errorCode BCOVPlaybackServiceErrorCodeAPIError. This is an NSArray of errors
 * returned by the Playback API.
 */
extern NSString * const kBCOVPlaybackServiceErrorKeyAPIErrors;

/**
 * Key for NSError.userInfo for errors with domain kBCOVPlaybackServiceErrorDomain
 * and errorCode BCOVPlaybackServiceErrorCodeAPIError. This is the HTTP status code
 * returned by the API request.
 */
extern NSString * const kBCOVPlaybackServiceErrorKeyAPIHTTPStatusCode;




/**
 * The BCOVPlaybackService class provides asynchronous methods for retrieving 
 * information about videos from Brightcove’s Playback API.
 */
@interface BCOVPlaybackService : NSObject

/**
 * NSURLSession shared across all network calls to the BCOVPlaybackService.
 * This object is created when the Playback Service is initialized.
 * If you wish to use your own NSURLSession you can set it here.
 * If set to nil, the default NSURLSession will be re-created.
 */
@property (nonatomic, strong) NSURLSession *sharedURLSession;

/**
 * Initializes a BCOVPlaybackService. It uses the accountId and policyKey
 * to create a BCOVPlaybackServiceRequestFactory internally.
 *
 *
 * @param accountId Account Id to be used for each request. Must not be nil.
 * @param policyKey PolicyKey to be used for each request. Must not be nil.
 * @return An initialized instance.
 */
- (instancetype)initWithAccountId:(NSString *)accountId policyKey:(NSString *)policyKey;

/**
 * Initializes a BCOVPlaybackService with a required BCOVPlaybackServiceRequestFactory.
 *
 * @param requestFactory Request Factory to use for creating URL requests.
 * @return An initialized instance.
 */
- (instancetype)initWithRequestFactory:(BCOVPlaybackServiceRequestFactory *)requestFactory NS_DESIGNATED_INITIALIZER;

/**
 * Retrieves a BCOVPlaylist from the Playback API service by its playlist ID on a
 * background queue.
 *
 * If the completionHandler provides an NSError, the BCOVPlaylist will be nil.
 *
 * @param playlistID The ID of the playlist to find.
 * @param parameters Additional NSString query parameters to add to the Playback
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findPlaylistWithPlaylistID:(NSString *)playlistID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVPlaylist *playlist, NSDictionary *jsonResponse, NSError *error))completionHandler;

/**
 * Retrieves a BCOVPlaylist from the Playback API service by its reference ID on a
 * background queue.
 *
 * If the completionHandler provides an NSError, the BCOVPlaylist will be nil.
 *
 * @param referenceID The reference ID of the video to find.
 * @param parameters Additional NSString query parameters to add to the Playback
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findPlaylistWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVPlaylist *playlist, NSDictionary *jsonResponse, NSError *error))completionHandler;

/**
 * Retrieves a BCOVVideo from the Playback API service by its video ID on a background
 * queue.
 *
 * If the completionHandler provides an NSError, the BCOVVideo will be nil.
 *
 * @param videoID The ID of the video to find.
 * @param parameters Additional NSString query parameters to add to the Playback
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findVideoWithVideoID:(NSString *)videoID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVVideo *video, NSDictionary *jsonResponse, NSError *error))completionHandler;

/**
 * Retrieves a BCOVVideo from the Playback API service by its reference ID on a background
 * queue.
 *
 * If the completionHandler provides an NSError, the BCOVVideo will be nil.
 *
 * @param referenceID The reference ID of the video to find.
 * @param parameters Additional NSString query parameters to add to the Playback
 * API requests. These values will override the default values if they conflict.
 * @param completionHandler block which will be invoked when the request
 * finishes. Execution of the completionHandler will occur on the main thread.
 */
- (void)findVideoWithReferenceID:(NSString *)referenceID parameters:(NSDictionary *)parameters completion:(void (^)(BCOVVideo *video, NSDictionary *jsonResponse, NSError *error))completionHandler;

@end
