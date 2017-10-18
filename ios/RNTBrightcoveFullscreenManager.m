#import "RNTBrightcoveFullscreenManager.h"
#import <React/RCTLog.h>

// RNTBrightcoveFullscreenManager.m
@implementation RNTBrightcoveFullscreenManager

RCT_EXPORT_MODULE(BrightcoveFullscreenPlayer);

RCT_EXPORT_METHOD(playVideo:(NSDictionary *)video)
{
  RCTLogInfo(@"Pretending to play video id:%@ account:%@ policyKey:%@", video[@"videoId"], video[@"accountId"], video[@"policyKey"]);
}

@end
