//
// NSDictionary+BCOVURLSupport.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>


/**
 * Adds convience methods to NSDictionary when working with URL requests.
 */
@interface NSDictionary (BCOVURLSupport)

/**
 * Constructs a string of key/value pairs that have been UTF-8 encoded for a
 * URL.
 *
 * @return The URL encoded string form of this dictionary.
 */
- (NSString *)bcov_UTF8EncodedRequestParameterString;

@end

