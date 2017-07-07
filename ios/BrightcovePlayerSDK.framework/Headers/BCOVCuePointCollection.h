//
// BCOVCuePointCollection.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

@class BCOVCuePoint;


/**
 * A collection of cue points, each element ordered by its position according
 * to the natural ordering of CMTime values.
 */
@interface BCOVCuePointCollection : NSObject <NSCopying, NSFastEnumeration>

/**
 * Constructs and returns a BCOVCuePointCollection from the cue points in the
 * specified array. The returned collection will be ordered according to the
 * positions of the cue points. The ordering of multiple cue points with
 * the same position is not guaranteed.
 *
 * @param cuePoints The new cue point collection's cue points.
 * @return The new cue point collection with the specified cue points.
 */
- (instancetype)initWithArray:(NSArray *)cuePoints;

/**
 * Constructs and returns a BCOVCuePointCollection with a single cue point.
 *
 * @param cuePoint The new cue point collection's cue point.
 * @return The new cue point collection with the specified cue point.
 */
- (instancetype)initWithCuePoint:(BCOVCuePoint *)cuePoint;

/**
 * Returns this collection's cue point objects in an array. The elements of the
 * array will have the same order as the ordering of cue points in this
 * collection.
 *
 * @return This collection's cue points in an array.
 */
- (NSArray *)array;

/**
 * Returns the number of cue points in this collection.
 *
 * @return The number of cue points in this collection.
 */
- (NSUInteger)count;

/**
 * Returns all cue points in this collection after the specified time.
 *
 * @param time The time after which corresponding cue points should be returned.
 * @return All cue points in this collection after the specified time.
 */
- (instancetype)cuePointsAfterTime:(CMTime)time;

/**
 * Returns all cue points in this collection before the specified time.
 *
 * @param time The time before which corresponding cue points should be returned.
 * @return All cue points in this collection before the specified time.
 */
- (instancetype)cuePointsBeforeTime:(CMTime)time;

/**
 * Returns all cue points in this collection at exactly the specified time.
 *
 * @param time The time at which corresponding cue points should be returned.
 * @return All cue points in this collection at exactly the specified time.
 */
- (instancetype)cuePointsAtTime:(CMTime)time;

/**
 * Returns all cue points in this collection at or after the specified time.
 *
 * @param time The time at or after which corresponding cue points should be
 * returned.
 * @return All cue points in this collection at or after the specified time.
 */
- (instancetype)cuePointsAtOrAfterTime:(CMTime)time;

/**
 * Returns all cue points in this collection at or before the specified time.
 *
 * @param time The time at or before which corresponding cue points should be
 * returned.
 * @return All cue points in this collection at or before the specified time.
 */
- (instancetype)cuePointsAtOrBeforeTime:(CMTime)time;

/**
 * Returns all cue points in this collection between the specified times.
 *
 * @param lowerBound The lower boundary, at or below which cue points should
 * not be returned.
 * @param upperBound The upper boundary, at or above which cue points should
 * not be returned.
 * @return All cue points in this collection between the specified times.
 */
- (instancetype)cuePointsAfterTime:(CMTime)lowerBound beforeTime:(CMTime)upperBound;

/**
 * Returns all cue points in this collection between the specified times,
 * inclusive of the upper bound.
 *
 * @param lowerBound The lower boundary, at or below which cue points should
 * not be returned.
 * @param upperBound The upper boundary, above which cue points should
 * not be returned.
 * @return All cue points in this collection between the specified times.
 */
- (instancetype)cuePointsAfterTime:(CMTime)lowerBound atOrBeforeTime:(CMTime)upperBound;

/**
 * Returns all cue points in this collection between the specified times,
 * inclusive of the lower bound.
 *
 * @param lowerBound The lower boundary, below which cue points should
 * not be returned.
 * @param upperBound The upper boundary, at or above which cue points should
 * not be returned.
 * @return All cue points in this collection between the specified times.
 */
- (instancetype)cuePointsAtOrAfterTime:(CMTime)lowerBound beforeTime:(CMTime)upperBound;

/**
 * Returns all cue points in this collection, at or between the specified times.
 *
 * @param lowerBound The lower boundary, below which cue points should not be
 * returned.
 * @param upperBound The upper boundary, above which cue points should not be
 * returned.
 * @return All cue points in this collection, at or between the specified times.
 */
- (instancetype)cuePointsAtOrAfterTime:(CMTime)lowerBound atOrBeforeTime:(CMTime)upperBound;

/**
 * Returns all cue points in this collection of the specified type.
 *
 * @param type The type of cue points to be returned.
 * @return All cue points in this collection, of the specified type.
 */
- (instancetype)cuePointsOfType:(NSString *)type;

/**
 * Returns YES if this instance has the same cue points in the same order as
 * `collection`.
 *
 * @param collection The collection with which to compare this instance.
 * @return Whether this instance is equivalent to `collection`.
 */
- (BOOL)isEqualToCollection:(BCOVCuePointCollection *)collection;

/**
 * Returns the cue point at the specified index, or nil if the specified index
 * is greater than the highest index into the collection.
 *
 * @param index The index into this collection of the desired cue point.
 * @return The cue point at the specified index, or nil if this collection
 * does not have a cue point at that index.
 */
- (BCOVCuePoint *)objectAtIndexedSubscript:(NSUInteger)index;

/**
 * Returns a new cue point collection containing the specified cue points.
 *
 * @param cuePoints An array of cue point objects to include in the collection.
 * @return A new cue point collection containing the specified cue points.
 */
+ (instancetype)collectionWithArray:(NSArray *)cuePoints;

/**
 * Returns a singleton cue point collection containing no cue points.
 *
 * @return A singleton cue point collection containing no cue points.
 */
+ (instancetype)emptyCollection;

@end
