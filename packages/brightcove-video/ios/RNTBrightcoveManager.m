#import "RNTBrightcoveManager.h"
#import <React/RCTBridge.h>

@implementation RNTBrightcoveManager

RCT_EXPORT_MODULE();
RCT_EXPORT_VIEW_PROPERTY(policyId, NSString);
RCT_EXPORT_VIEW_PROPERTY(accountId, NSString);
RCT_EXPORT_VIEW_PROPERTY(videoId, NSString);
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onIOSError, RCTBubblingEventBlock);

@synthesize bridge = _bridge;

- (UIView *)view {
  return [[RNTBrightcove alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
