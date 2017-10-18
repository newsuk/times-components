#import "RNTBrightcoveView.h"
#import "RNTBrightcoveFullscreenManager.h"
#import "RNTBrightcoveViewController.h"
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
  
  RNTBrightcoveView* brightcoveView = [[RNTBrightcoveView alloc] initWithEventDispatcher:nil];
  
  brightcoveView.translatesAutoresizingMaskIntoConstraints = NO;
  
  brightcoveView.videoId = video[@"videoId"];
  brightcoveView.accountId = video[@"accountId"];
  brightcoveView.policyKey = video[@"policyKey"];
  brightcoveView.autoplay = YES;
  brightcoveView.hideFullScreenButton = YES;
  
  self.videoContainerViewController = [RNTBrightcoveViewController new];
  [self.videoContainerViewController.view addSubview:brightcoveView];
  
  NSDictionary *views = NSDictionaryOfVariableBindings(brightcoveView);

  NSArray* horizontalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"H:|[brightcoveView]|" options: 0 metrics: nil views: views];
  NSArray* verticalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"V:|[brightcoveView]|" options: 0 metrics: nil views: views];

  [self.videoContainerViewController.view addConstraints:horizontalConstraints];
  [self.videoContainerViewController.view addConstraints:verticalConstraints];

  [[self rootViewController] presentViewController:self.videoContainerViewController animated:YES completion:nil];
  
}

- (UIViewController *)rootViewController {
  return [[[[UIApplication sharedApplication] delegate] window] rootViewController];
}

@end
