//
// BCOVSource.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>

@protocol BCOVMutableSource;


/**
 * The URL scheme for HTTP.
 */
extern NSString * const kBCOVSourceURLSchemeHTTP;

/**
 * The URL scheme for HTTPS.
 */
extern NSString * const kBCOVSourceURLSchemeHTTPS;

/**
 * The delivery method for HLS (HTTP Live Streaming) media.
 */
extern NSString * const kBCOVSourceDeliveryHLS;

/**
 * The delivery method for MP4 (typically progressive download) media.
 */
extern NSString * const kBCOVSourceDeliveryMP4;

/**
 * The delivery method for DASH media.
 */
extern NSString * const kBCOVSourceDeliveryDASH;

/**
 * The key used in the source properties to declare the DRM type of this source.
 */
extern NSString * const kBCOVSourceKeySystems;


/**
 * A specific "source" or rendition within a BCOVVideo object. While Brightcove
 * organizes content into entities called videos, the actual media URLs at
 * which the content can be accessed is encapsulated by a source. In addition
 * to the URL, a source may have an optional delivery type which can be used
 * to help disambiguate it from other sources, and a set of properties distinct
 * from the properties on the video which owns it.
 *
 * Note that it is valid for a video to contain multiple sources with the same
 * delivery type, in which case the sources must be disambiguated by some other
 * means (such as with different values in their respective properties).
 */
@protocol BCOVSource <NSObject>

/**
 * The URL at which this source instance's media is accessible.
 */
@property (nonatomic, readonly, copy) NSURL *url;

/**
 * The delivery method describing this source in relation to other sources in
 * the same video.
 */
@property (nonatomic, readonly, copy) NSString *deliveryMethod;

/**
 * The metadata or properties related to this source instance.
 */
@property (nonatomic, readonly, copy) NSDictionary *properties;

/**
 * Returns a modified version of this source. Because BCOVSource objects
 * are immutable, an entirely new BCOVSource must be created even if only
 * a single change is needed. Therefore, this method provides a convenient way
 * to obtain a temporary mutable copy of this instance and modify it (within
 * `updateBlock`).
 *
 * Do not attempt to save a reference to the mutable source passed to
 * `updateBlock`, as the behavior of doing this is undefined. Instead, make
 * whatever modifications are necessary in the block and then capture the source
 * object returned from this method.
 *
 * @param updateBlock A block which is passed a mutable copy of this source.
 * @return The copy of this source modified by `updateBlock`.
 */
- (instancetype)update:(void (^)(id<BCOVMutableSource> mutableSource))updateBlock;

@end


/**
 * Sub-protocol of BCOVSource, used only in its `-update` method.
 */
@protocol BCOVMutableSource <BCOVSource>

@property (nonatomic, readwrite, copy) NSURL *url;
@property (nonatomic, readwrite, copy) NSString *deliveryMethod;
@property (nonatomic, readwrite, copy) NSDictionary *properties;

@end


/**
 * Implementation of the BCOVSource protocol.
 */
@interface BCOVSource : NSObject <BCOVSource, NSCopying>

/**
 * Constructs a new source with the specified URL.
 *
 * @param url The URL at which the new source's media can be accessed.
 * @return A new source with the specified URL.
 */
- (instancetype)initWithURL:(NSURL *)url;

/**
 * Constructs a new source with the specified URL, delivery method, and
 * properties.
 *
 * @param url The URL at which the new source's media can be accessed.
 * @param deliveryMethod The delivery method of the new source.
 * @param properties The metadata or properties related to the new source.
 * @return A new source with the specified URL, delivery method, and properties.
 */
- (instancetype)initWithURL:(NSURL *)url deliveryMethod:(NSString *)deliveryMethod properties:(NSDictionary *)properties;

/**
 * Returns YES if `source` is equivalent to this instance.
 *
 * @param source The source to test for equivalence with this instance.
 * @return Whether `source` is equivalent to this instance.
 */
- (BOOL)isEqualToSource:(BCOVSource *)source;

@end
