//
// BCOVPlaybackSessionProvider.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>
#import <CoreMedia/CoreMedia.h>


/**
 * Objects that conform to this protocol vend a series of playback sessions
 * that correspond to the specified videos.
 */
@protocol BCOVPlaybackSessionProvider <NSObject>

/**
 * Returns a series of id<BCOVPlaybackSession> objects that correspond to the
 * specified videos. The first playback session will be sent as soon as it
 * becomes available. Each subsequent playback session will be sent after its
 * previous (leading) playback session is terminated. Playback sessions may be
 * delivered asynchronously.
 *
 * @param videos The BCOVVideo objects to which the returned playback session
 * objects should correspond.
 * @return The BCOVPlaybackSession objects that correspond to the specified
 * videos.
 */
- (id)playbackSessionsForVideos:(id<NSFastEnumeration>)videos;

@end
