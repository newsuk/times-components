//
// BCOVCuePoint.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>


/**
 * Cue point type representing the start of an ad slot
 */
extern NSString * const kBCOVCuePointTypeAdSlot;

/**
 * Cue point type representing a companion ad
 */
extern NSString * const kBCOVCuePointTypeAdCompanion;


@protocol BCOVMutableCuePoint;


/**
 * The cue point position immediately after the last time interval of the
 * video which owns it. This is generally used to implement post-roll ad
 * functionality.
 */
#define kBCOVCuePointPositionTypeAfter kCMTimePositiveInfinity

/**
 * The cue point position immediately before the first time interval of the
 * video which owns it. This is generally used to implement pre-roll ad
 * functionality.
 */
#define kBCOVCuePointPositionTypeBefore kCMTimeZero


/**
 * Value class representing a cue point in the Brightcove Player SDK ecosystem.
 * A cue point is used to specify a position on the timeline of a piece of
 * content that can be used for any purpose (often for programmatic control
 * over when advertisements should be shown). When playback reaches a cue point,
 * the playback session sends an event on its `cuePoints` signal that includes
 * the BCOVCuePoint value.
 */
@protocol BCOVCuePoint <NSObject>

/**
 * The time at which the cue point occurs on the timeline of the BCOVVideo
 * which owns it.
 */
@property (nonatomic, readonly, assign) CMTime position;

/**
 * An identifier for the kind of this cue point. There is no predetermined
 * enumeration of values for this property. The value to use may be required
 * by certain Brightcove Player SDK for iOS plugins, or it can be used for
 * some other client-specific purpose. The core SDK does not use this value.
 */
@property (nonatomic, readonly, copy) NSString *type;

/**
 * Additional properties of the cue point. The keys and values are unspecified,
 * specific keys or values may be required by certain Brightcove Player SDK for
 * iOS plugins, or it can be used for some other client-specific purpose. The
 * core SDK does not use this value.
 */
@property (nonatomic, readonly, copy) NSDictionary *properties;

/**
 * Returns a modified version of this cue point. Because BCOVCuePoint objects
 * are immutable, an entirely new BCOVCuePoint must be created even if only
 * a single change is needed. Therefore, this method provides a convenient way
 * to obtain a temporary mutable copy of this instance and modify it (within
 * `updateBlock`).
 *
 * Do not attempt to save a reference to the mutable cue point passed to
 * `updateBlock`, as the behavior of doing this is undefined. Instead, make
 * whatever modifications are necessary in the block and then capture the cue
 * point object returned from this method.
 *
 * @param updateBlock A block which is passed a mutable copy of this cue point.
 * @return The copy of this cue point modified by `updateBlock`.
 */
- (instancetype)update:(void (^)(id<BCOVMutableCuePoint> mutableCuePoint))updateBlock;

@end


/**
 * Sub-protocol of BCOVCuePoint, used only in its `-update` method.
 */
@protocol BCOVMutableCuePoint <BCOVCuePoint>

@property (nonatomic, readwrite, assign) CMTime position;
@property (nonatomic, readwrite, copy) NSString *type;
@property (nonatomic, readwrite, copy) NSDictionary *properties;

@end


/**
 * Implementation of the BCOVCuePoint protocol.
 */
@interface BCOVCuePoint : NSObject <BCOVCuePoint, NSCopying>

/**
 * Constructs a new cue point with the specified type and position.
 *
 * @param type The type of the new cue point.
 * @param position The position of the new cue point.
 * @return A new cue point with the specified type and position.
 */
- (instancetype)initWithType:(NSString *)type position:(CMTime)position;

/**
 * Constructs a new cue point with the specified type, position, and properties.
 *
 * @param type The type of the new cue point.
 * @param position The position of the new cue point.
 * @param properties The properties of the new cue point.
 * @return A new cue point with the specified type, position, and properties.
 */
- (instancetype)initWithType:(NSString *)type position:(CMTime)position properties:(NSDictionary *)properties;

/**
 * Returns an NSComparisionResult indicating whether this cue point's position
 * is earlier, the same, or later than the position of `cuePoint`. Only
 * positions are compared.
 *
 * @param cuePoint The cue point whose position is to be compared with this
 * instance.
 * @return Whether this cue point's position is earlier, the same, or later.
 */
- (NSComparisonResult)compare:(BCOVCuePoint *)cuePoint;

/**
 * Returns YES if this instance's position is `position`.
 *
 * @param position The position to test this instance's position against.
 * @return Whether this instance has the specified position.
 */
- (BOOL)hasPosition:(CMTime)position;

/**
 * Returns YES if `cuePoint` is equivalent to this instance.
 *
 * @param cuePoint The cue point to test for equivalence with this instance.
 * @return Whether `cuePoint` is equivalent to this instance.
 */
- (BOOL)isEqualToCuePoint:(BCOVCuePoint *)cuePoint;

/**
 * Returns a cue point with the specified type and properties whose position is
 * kBCOVCuePointPositionTypeAfter.
 *
 * @param type The type of the cue point to return.
 * @param properties The properties of the cue point to return.
 * @return The "after" cue point with the specified type and properties.
 */
+ (BCOVCuePoint *)afterCuePointOfType:(NSString *)type properties:(NSDictionary *)properties;

/**
 * Returns a cue point with the specified type and properties whose position is
 * kBCOVCuePointPositionTypeBefore.
 *
 * @param type The type of the cue point to return.
 * @param properties The properties of the cue point to return.
 * @return The "before" cue point with the specified type and properties.
 */
+ (BCOVCuePoint *)beforeCuePointOfType:(NSString *)type properties:(NSDictionary *)properties;

/**
 * Returns a cue point with the specified type and properties whose position in
 * seconds is at `positionInSeconds`.
 *
 * @param type The type of the cue point to return.
 * @param positionInSeconds The position (in seconds) of this cue point into
 * the timeline of the video which owns it.
 * @param properties The properties of the cue point to return.
 * @return The cue point with the specified type, position, and properties.
 */
+ (BCOVCuePoint *)cuePointWithType:(NSString *)type positionInSeconds:(NSTimeInterval)positionInSeconds properties:(NSDictionary *)properties;

@end
