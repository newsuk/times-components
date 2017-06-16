//
// BrightcovePlayerSDK.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

//! Project version string for BrightcovePlayerSDK.
FOUNDATION_EXPORT const unsigned char BrightcovePlayerSDKVersionString[];

// Catalog
#import <BrightcovePlayerSDK/BCOVCatalogConstants.h>
#import <BrightcovePlayerSDK/BCOVCatalogService.h>
#import <BrightcovePlayerSDK/BCOVMediaRequestFactory.h>
#import <BrightcovePlayerSDK/NSDictionary+BCOVURLSupport.h>

// Playback API
#import <BrightcovePlayerSDK/BCOVPlaybackService.h>
#import <BrightcovePlayerSDK/BCOVPlaybackServiceRequestFactory.h>

// Management
#import <BrightcovePlayerSDK/BCOVPlayerSDKManager.h>

// Playback
#import <BrightcovePlayerSDK/BCOVBasicSessionProvider.h>
#import <BrightcovePlayerSDK/BCOVCuePointProgressPolicy.h>
#import <BrightcovePlayerSDK/BCOVPlaybackController.h>
#import <BrightcovePlayerSDK/BCOVPlaybackSession.h>
#import <BrightcovePlayerSDK/BCOVPlaybackSessionProvider.h>

// Values
#import <BrightcovePlayerSDK/BCOVCuePoint.h>
#import <BrightcovePlayerSDK/BCOVCuePointCollection.h>
#import <BrightcovePlayerSDK/BCOVPlaylist.h>
#import <BrightcovePlayerSDK/BCOVSource.h>
#import <BrightcovePlayerSDK/BCOVVideo.h>

// Ads
#import <BrightcovePlayerSDK/BCOVAdvertising.h>

// Player UI
#if !TARGET_OS_TV
#import <BrightcovePlayerSDK/BCOVPUIBasicControlView.h>
#import <BrightcovePlayerSDK/BCOVPUIButton.h>
#import <BrightcovePlayerSDK/BCOVPUICommon.h>
#import <BrightcovePlayerSDK/BCOVPUILayoutView.h>
#import <BrightcovePlayerSDK/BCOVPUIPlayerView.h>
#import <BrightcovePlayerSDK/BCOVPUISlider.h>
#endif
