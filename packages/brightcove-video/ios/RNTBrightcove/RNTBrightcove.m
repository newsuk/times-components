#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/UIView+React.h>
#import <React/RCTLog.h>

#import "RNTBrightcove.h"
#import "RNTFullscreenPresentingAutoRotatingViewController.h"

#pragma mark - Private Properties -

@interface RNTBrightcove () <BCOVPlaybackControllerDelegate, BCOVPUIPlayerViewDelegate>

@property (nonatomic, strong) BCOVPlaybackService *playbackService;
@property (nonatomic, strong) id<BCOVPlaybackController> playbackController;
@property (nonatomic) BCOVPUIPlayerView *playerView;
@property (nonatomic, strong) RNTFullscreenPresentingAutoRotatingViewController* fullscreenViewController;

@end

#pragma mark -
@implementation RNTBrightcove {
  RCTEventDispatcher *_eventDispatcher;
  Boolean _isPlaying;
  NSInteger _progress;
  NSInteger _duration;
  NSNumber *_autoplayNumber;
  Boolean _isFinished;
  NSNumber *_hideFullScreenButtonNumber;
}

-(instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  return self;
}

-(instancetype)initWithCoder:(NSCoder *)aDecoder {
  self = [super initWithCoder:aDecoder];
  return self;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher {
  if ((self = [super init])) {
    _eventDispatcher = eventDispatcher;
  }

  return self;
}

- (void)setup {
  _isPlaying = NO;
  _progress = 0;
  _isFinished = NO;

  BCOVPlayerSDKManager *manager = [BCOVPlayerSDKManager sharedManager];

  _playbackController = [manager createPlaybackController];
  _playbackController.delegate = self;
  _playbackController.autoAdvance = YES;
  _playbackController.autoPlay = [_autoplayNumber boolValue];

  _playbackService = [[BCOVPlaybackService alloc] initWithAccountId:_accountId
                                                          policyKey:_policyKey];
}

- (void)requestContentFromPlaybackService {
  [self.playbackService findVideoWithVideoID:_videoId parameters:nil completion:^(BCOVVideo *video, NSDictionary *jsonResponse, NSError *error) {
#pragma unused (jsonResponse)
    if (video) {
      _duration = [video.properties[@"duration"] intValue];

      [self.playbackController setVideos:@[ video ]];
    } else {
      [self emitError:error];
    }
  }];
}

- (void)layoutSubviews {
  _playerView.frame = self.bounds;
  [self addSubview:_playerView];
}

- (void)removeFromSuperview {
  _eventDispatcher = nil;
  [super removeFromSuperview];
}

- (void)initPlayerView {
  if (_policyKey && _accountId && _videoId && _autoplayNumber && _hideFullScreenButtonNumber) {
    [self setup];

    BCOVPUIBasicControlView *controlsView = [BCOVPUIBasicControlView basicControlViewWithVODLayout];
    controlsView.playbackButton.accessibilityIdentifier = @"play";
    controlsView.jumpBackButton.accessibilityIdentifier = @"jump-back";
    controlsView.currentTimeLabel.accessibilityIdentifier = @"current-time";
    controlsView.durationLabel.accessibilityIdentifier = @"duration";
    controlsView.screenModeButton.accessibilityIdentifier = @"screen-mode";

    [controlsView.screenModeButton setHidden:[_hideFullScreenButtonNumber boolValue]];

    BCOVPUIPlayerViewOptions *options = [[BCOVPUIPlayerViewOptions alloc] init];

    options.presentingViewController = [self fullscreenViewController];

    BCOVPUIPlayerView *playerView = [[BCOVPUIPlayerView alloc] initWithPlaybackController:self.playbackController options:options controlsView:controlsView ];
    playerView.delegate = self;

    playerView.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;

    _playerView = playerView;
    _playerView.playbackController = _playbackController;

    [self requestContentFromPlaybackService];
  }
}

- (void)setPolicyKey:(NSString *)policyKey {
  if (![policyKey isEqual:_policyKey]) {
    _policyKey = policyKey;
    [self initPlayerView];
  }
}

- (void)setAccountId:(NSString *)accountId {
  if (![accountId isEqual:_accountId]) {
    _accountId = accountId;
    [self initPlayerView];
  }
}

- (void)setVideoId:(NSString *)videoId {
  if (![videoId isEqual:_videoId]) {
    _videoId = videoId;
    [self initPlayerView];
  }
}

- (void)setAutoplay:(BOOL)autoplay {
  if (_autoplayNumber == nil || autoplay != [_autoplayNumber boolValue]) {
    _autoplayNumber = [NSNumber numberWithBool:autoplay];
    [self initPlayerView];
  }
}

- (void)setHideFullScreenButton:(BOOL)hideFullScreenButton {
  if (_hideFullScreenButtonNumber == nil || hideFullScreenButton != [_hideFullScreenButtonNumber boolValue]) {
    _hideFullScreenButtonNumber = [NSNumber numberWithBool:hideFullScreenButton];
    [self initPlayerView];
  }
}

- (void)emitStatus {
  if (!self.onChange) {
    return;
  }

  self.onChange(@{
    @"isPlaying": [NSNumber numberWithBool:_isPlaying],
    @"progress": [NSNumber numberWithLong:_progress],
    @"duration": [NSNumber numberWithLong:_duration],
    @"isFinished": [NSNumber numberWithBool:_isFinished]
  });
}

- (void)playVideo {
  [_playbackController play];
}

- (void)pauseVideo {
  [_playbackController pause];
}

- (void)emitError:(NSError *)error {
  if (!self.onIOSError) {
    return;
  }

  NSString *code = [NSString stringWithFormat:@"%ld", (long)[error code]];

  self.onIOSError(@{@"code": code, @"message": [error localizedDescription]});
}

- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didReceiveLifecycleEvent:(BCOVPlaybackSessionLifecycleEvent *)lifecycleEvent {

#pragma unused (controller)
#pragma unused (session)

  if ([kBCOVPlaybackSessionLifecycleEventPlay isEqualToString:lifecycleEvent.eventType]) {
    _isPlaying = YES;

    [self emitStatus];
  }

  if ([kBCOVPlaybackSessionLifecycleEventPause isEqualToString:lifecycleEvent.eventType]) {
    _isPlaying = NO;

    if(_progress >= _duration) {
      _isFinished = YES;
    }

    [self emitStatus];
  }
}

- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didProgressTo:(NSTimeInterval)progress {

#pragma unused (controller)
#pragma unused (session)

  _isFinished = NO;

  // for some reason the brightcove SDK returns infinities at the begining and end of videos,
  // this code normalises progress if they are encountered
  if (progress == -INFINITY) {
    _progress = 0;
  } else if (progress == INFINITY) {
    _progress = _duration;
  } else {
    _progress = progress * 1000;
  }

  [self emitStatus];
}

- (UIViewController *)rootViewController{
  return [[[[UIApplication sharedApplication] delegate] window] rootViewController];
}

- (RNTFullscreenPresentingAutoRotatingViewController *)fullscreenViewController {
  
  if (_fullscreenViewController) {
    return _fullscreenViewController;
  }
  
  RNTFullscreenPresentingAutoRotatingViewController* vc = [RNTFullscreenPresentingAutoRotatingViewController new];
  vc.viewControllerToPresentFrom = [self rootViewController];

  _fullscreenViewController = vc;
  
  return _fullscreenViewController;

}

@end
