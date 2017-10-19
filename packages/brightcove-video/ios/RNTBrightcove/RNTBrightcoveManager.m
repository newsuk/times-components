
#import "RNTBrightcoveManager.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RNTBrightcoveManager

RCT_EXPORT_MODULE();
RCT_EXPORT_VIEW_PROPERTY(policyKey, NSString);
RCT_EXPORT_VIEW_PROPERTY(accountId, NSString);
RCT_EXPORT_VIEW_PROPERTY(videoId, NSString);
RCT_EXPORT_VIEW_PROPERTY(autoplay, BOOL);
RCT_EXPORT_VIEW_PROPERTY(hideFullScreenButton, BOOL);
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onIOSError, RCTBubblingEventBlock);

RCT_EXPORT_METHOD(play:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RNTBrightcoveView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RNTBrightcoveView, got: %@", view);
    } else {
      RNTBrightcoveView *videoView = (RNTBrightcoveView *)view;
      [videoView playVideo];
    }
  }];
}

RCT_EXPORT_METHOD(pause:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RNTBrightcoveView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RNTBrightcoveView, got: %@", view);
    } else {
      RNTBrightcoveView *videoView = (RNTBrightcoveView *)view;
      [videoView pauseVideo];
    }
  }];
}

@synthesize bridge = _bridge;

- (UIView *)view {
  return [[RNTBrightcoveView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
