//
// BCOVCuePointProgressPolicy.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>

@class BCOVCuePoint;
@class BCOVCuePointCollection;
@class BCOVCuePointProgressPolicyResult;

/**
 * Enumeration to specify which cue points should be processed by a consumer of
 * a cue point progress policy.
 */
typedef NS_ENUM(NSInteger, BCOVProgressPolicyCuePointsToProcess) {

    /**
     * Configures the cue point progress policy to process all cue points in
     * the range traversed by the progress event.
     * For example, if a seek occurs from 0:00 to 2:00, and there are three
     * cue points with positions at 0:30, 1:00, and 1:30, the policy will
     * instruct its caller to process all three cue points.
     */
    BCOVProgressPolicyProcessAllCuePoints,
    
    /**
     * Configures the cue point progress policy to process only the final cue
     * point in the range traversed by the progress event.
     * For example, if a seek occurs from 0:00 to 2:00, and there are three cue
     * points with positions at 0:30, 1:00, and 1:30, the policy will instruct
     * its caller to process only the cue point at 1:30.
     */
    BCOVProgressPolicyProcessFinalCuePoint,
    
    /**
     * Configures the cue point progress policy to process only the first cue
     * point in the range traversed by the progress event.
     * For example, if a seek occurs from 0:00 to 2:00, and there are three cue
     * points with positions at 0:30, 1:00, and 1:30, the policy will instruct
     * its caller to process only the cue point at 0:30.
     */
    BCOVProgressPolicyProcessFirstCuePoint
};

/**
 * Enumeration to specify where content playback should resume once cue
 * points have been processed.
 */
typedef NS_ENUM(NSInteger, BCOVProgressPolicyResumePosition) {
    
    /**
     * Configures the cue point progress policy to resume from the current
     * content playhead once all cue points have been processed.
     * For example, if a seek occurs from 0:00 to 2:00, and there are three cue
     * points with positions at 0:30, 1:00, and 1:30, the policy will instruct
     * its caller to resume content playback at 2:00.
     */
    BCOVProgressPolicyResumeFromContentPlayhead,
    
    /**
     * Configures the cue point progress policy to resume from the last
     * processed cue point position, once all cue points have been processed.
     * For example, if a seek occurs from 0:00 to 2:00, and there are three cue
     * points with positions at 0:30, 1:00, and 1:30, the policy will instruct
     * its caller to resume content playback at 1:31.
     */
    BCOVProgressPolicyResumeFromLastProcessedCuePoint
};


/**
 * This policy provides clients of BCOVPlayerSDK with the means of specifying
 * the behavior of code that acts in response to cue point events. The most
 * common application for this is in creating ad policies: the playhead reaches
 * a cue point that indicates an ad should be shown, and an instance of this
 * policy is provided by the client code to specify how the player should
 * behave, with respect to:
 *
 * 1. Which cue points should be processed by the code consulting the
 *    policy.
 * 2. The time (playhead position) at which playback should resume once the cue
 *    points have been processed. This is specified using one of the cue points
 *    that was passed into the policy, or `nil` (which indicates that the
 *    content should resume from its current playhead position).
 */
@interface BCOVCuePointProgressPolicy : NSObject

/**
 * Returns a BCOVCuePointProgressPolicyResult that specifies which cue points
 * are to be processed by the code consulting this policy, as well as the
 * position at which playback should resume once all cue points have been
 * processed.
 *
 * This method is called by the consumer of the cue point progress policy. In
 * most cases, that consumer is an advertising plugin to the Brightcove Player
 * SDK, not the client (app) of the Player SDK. A custom cue point policy
 * should override this method if a policy cannot be produced using a
 * convenience factory class method.
 *
 * @param cuePointEvent A dictionary containing cue point event information, as
 * specified in the BCOVPlaybackController cue point delegate method.
 * @return A policy result for the specified cue point event.
 */
- (BCOVCuePointProgressPolicyResult *)applyToEvent:(NSDictionary *)cuePointEvent;

/**
 * Convenience factory method that returns a cue point progress policy
 * configured according to the specified parameters.
 *
 * @param cuePointsToProcess A BCOVProgressPolicyCuePointsToProcess that
 * configures the returned policy to tell its caller which cue points should be
 * processed, out of the cue points in a given cue point event.
 * @param resumePosition A BCOVProgressPolicyResumePosition that configures the
 * returned policy to tell its caller where content playback should resume,
 * once it has processed all specified cue points.
 * @param ignorePrevious Whether the returned policy should tell its caller to
 * ignore cue points that it has already been instructed to process.
 * @return A cue point progress policy configured with the specified settings.
 */
+ (instancetype)progressPolicyProcessingCuePoints:(BCOVProgressPolicyCuePointsToProcess)cuePointsToProcess resumingPlaybackFrom:(BCOVProgressPolicyResumePosition)resumePosition ignoringPreviouslyProcessedCuePoints:(BOOL)ignorePrevious;

@end


/**
 * Communicates the result of a BCOVCuePointProgressPolicy object to the code
 * consulting the policy.
 */
@interface BCOVCuePointProgressPolicyResult : NSObject

/**
 * Returns an initialized instance of BCOVCuePointProgressPolicy with the specified
 * cue points and the cue point at which playback should resume. Specify a `nil`
 * resumeCuePoint to indicate that playback should continue from the current
 * playhead position.
 *
 * @param cuePoints The cue points that should be processed by the client of
 * this policy, as determined by the policy.
 * @param resumeCuePoint The cue point whose position represents the time at
 * which playback should resume. Specify `nil` to indicate that playback should
 * continue from the current playhead position.
 * @return A newly initialized cue point progress policy result.
 */
- (instancetype)initWithCuePoints:(BCOVCuePointCollection *)cuePoints resumeCuePoint:(BCOVCuePoint *)resumeCuePoint;

/**
 * Indicates the cue point at which playback should resume, once the code
 * consulting the BCOVCuePointProgressPolicy has finished processing this
 * result's cue points. May be nil (which indicates that playback should
 * resume from wherever the playhead is currently).
 */
@property (nonatomic, copy, readonly) BCOVCuePoint *resumeCuePoint;

/**
 * Indicates which cue points should be included for consideration, as
 * specified by a BCOVCuePointProgressPolicy.
 */
@property (nonatomic, copy, readonly) BCOVCuePointCollection *cuePoints;

@end
