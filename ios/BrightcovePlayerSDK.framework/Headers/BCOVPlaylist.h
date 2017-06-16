//
// BCOVPlaylist.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>

@class BCOVVideo;
@protocol BCOVMutablePlaylist;


/**
 * Value class representing a playlist in the Brightcove Player SDK ecosystem.
 * A playlist is an ordered collection of videos, as well as additional optional
 * metadata about the collection in the form of properties. Note that because
 * BCOVPlaylist implements NSFastEnumeration, it can be used in methods that
 * take NSFastEnumeration parameters (such as `-[BCOVPlaybackController setVideos:]`).
 */
@protocol BCOVPlaylist <NSObject, NSFastEnumeration>

/**
 * The BCOVVideo instances which comprise this playlist.
 */
@property (nonatomic, readonly, copy) NSArray *videos;

/**
 * Additional properties or metadata related to this playlist.
 */
@property (nonatomic, readonly, copy) NSDictionary *properties;

/**
 * Returns a modified version of this playlist. Because BCOVPlaylist objects
 * are immutable, an entirely new BCOVPlaylist must be created even if only
 * a single change is needed. Therefore, this method provides a convenient way
 * to obtain a temporary mutable copy of this instance and modify it (within
 * `updateBlock`).
 *
 * Do not attempt to save a reference to the mutable playlist passed to
 * `updateBlock`, as the behavior of doing this is undefined. Instead, make
 * whatever modifications are necessary in the block and then capture the
 * playlist object returned from this method.
 *
 * @param updateBlock A block which is passed a mutable copy of this playlist.
 * @return The copy of this cue point modified by `updateBlock`.
 */
- (instancetype)update:(void (^)(id<BCOVMutablePlaylist> mutablePlaylist))updateBlock;

@end


/**
 * Sub-protocol of BCOVPlaylist, used only in its `-update` method.
 */
@protocol BCOVMutablePlaylist <BCOVPlaylist>

@property (nonatomic, readwrite, copy) NSArray *videos;
@property (nonatomic, readwrite, copy) NSDictionary *properties;

@end


/**
 * Implementation of the BCOVPlaylist protocol.
 */
@interface BCOVPlaylist : NSObject <BCOVPlaylist, NSCopying>

/**
 * Constructs a new playlist with the specified videos and properties.
 *
 * @param videos The video contents of this playlist.
 * @param properties The metadata or other properties related to this playlist.
 * @return A new playlist with the specified videos.
 */
- (instancetype)initWithVideos:(NSArray *)videos properties:(NSDictionary *)properties;

/**
 * Constructs a new playlist with the specified videos.
 *
 * @param videos The video contents of this playlist.
 * @return A new playlist with the specified videos.
 */
- (instancetype)initWithVideos:(NSArray *)videos;

/**
 * Constructs a new playlist with the specified video and properties.
 *
 * @param video The video contents of this playlist.
 * @param properties The metadata or other properties related to this playlist.
 * @return A new playlist with the specified video and properties.
 */
- (instancetype)initWithVideo:(BCOVVideo *)video properties:(NSDictionary *)properties;

/**
 * Constructs a new playlist with the specified video.
 *
 * @param video The video contents of this playlist.
 * @return A new playlist with the specified video.
 */
- (instancetype)initWithVideo:(BCOVVideo *)video;

/**
 * Returns the video at the specified index, or nil if the specified index
 * is greater than the highest index into the playlist.
 *
 * @param index The index into this collection of the desired video.
 * @return The video at the specified index, or nil if this playlist
 * does not have a video at that index.
 */
- (BCOVVideo *)objectAtIndexedSubscript:(NSUInteger)index;

/**
 * Returns YES if `playlist` is equivalent to this instance.
 *
 * @param playlist The playlist to test for equivalence with this instance.
 * @return Whether `playlist` is equivalent to this instance.
 */
- (BOOL)isEqualToPlaylist:(BCOVPlaylist *)playlist;

/**
 * Returns the number of this instance's videos.
 *
 * @return The number of videos in this instance.
 */
- (NSUInteger)count;

@end
