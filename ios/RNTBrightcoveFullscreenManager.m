#import "RNTBrightcoveFullscreenManager.h"
#import "RNTBrightcove.h"
#import <React/RCTLog.h>

@interface RNTBrightcoveFullscreenManager ()
@property (nonatomic, strong) UIViewController * videoContainerViewController;
@end


@implementation RNTBrightcoveFullscreenManager

RCT_EXPORT_MODULE(BrightcoveFullscreenPlayer);

RCT_EXPORT_METHOD(playVideo:(NSDictionary *)video) {
  
  __weak RNTBrightcoveFullscreenManager *weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    [weakSelf presentFullscreenVideo: video];
  });
}

- (void)presentFullscreenVideo:(NSDictionary *)video {
  
  RNTBrightcove* brightcoveView = [[RNTBrightcove alloc] initWithEventDispatcher:nil];
  
  brightcoveView.videoId = video[@"videoId"];
  brightcoveView.accountId = video[@"accountId"];
  brightcoveView.policyKey = video[@"policyKey"];
  brightcoveView.autoplay = YES;
  brightcoveView.hideFullScreenButton = YES;
  
  self.videoContainerViewController = [UIViewController new];
  self.videoContainerViewController.view = brightcoveView;
  
  [[self rootViewController] presentViewController:self.videoContainerViewController animated:YES completion:nil];
  
}

- (UIViewController *)rootViewController {
  return [[[[UIApplication sharedApplication] delegate] window] rootViewController];
}

@end
