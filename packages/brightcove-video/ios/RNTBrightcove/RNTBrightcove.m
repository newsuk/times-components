#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/UIView+React.h>
#import <React/RCTLog.h>

#import "RNTBrightcove.h"

@interface RNTBrightcove () <BCOVPlaybackControllerDelegate, BCOVPUIPlayerViewDelegate>

@property (nonatomic, strong) BCOVPlaybackService *playbackService;
@property (nonatomic, strong) id<BCOVPlaybackController> playbackController;
@property (nonatomic) BCOVPUIPlayerView *playerView;

@end

@implementation RNTBrightcove {
  RCTEventDispatcher *_eventDispatcher;
  NSString *_playerStatus;
  NSString *_playheadPosition;
  NSNumber *_autoplayNumber;
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
  _playerStatus = @"paused";
  _playheadPosition = @"0";

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
  if (_policyKey && _accountId && _videoId && _autoplayNumber != nil && _hideFullScreenButtonNumber != nil) {
    [self setup];

    BCOVPUIBasicControlView *controlsView = [BCOVPUIBasicControlView basicControlViewWithVODLayout];
    controlsView.playbackButton.accessibilityIdentifier = @"play";
    controlsView.jumpBackButton.accessibilityIdentifier = @"jump-back";
    controlsView.currentTimeLabel.accessibilityIdentifier = @"current-time";
    controlsView.durationLabel.accessibilityIdentifier = @"duration";
    controlsView.screenModeButton.accessibilityIdentifier = @"screen-mode";
    
    if ([_hideFullScreenButtonNumber boolValue]) {
      [controlsView.screenModeButton removeFromSuperview];
    }

    BCOVPUIPlayerViewOptions *options = [[BCOVPUIPlayerViewOptions alloc] init];

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

  self.onChange(@{@"playerStatus": _playerStatus, @"playheadPosition": _playheadPosition});
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
    _playerStatus = @"playing";

    [self emitStatus];
  }

  if ([kBCOVPlaybackSessionLifecycleEventPause isEqualToString:lifecycleEvent.eventType]) {
    _playerStatus = @"paused";

    [self emitStatus];
  }
}

- (void)playbackController:(id<BCOVPlaybackController>)controller playbackSession:(id<BCOVPlaybackSession>)session didProgressTo:(NSTimeInterval)progress {

  #pragma unused (controller)
  #pragma unused (session)

  NSNumber *progressNumber = [NSNumber numberWithDouble:progress];

  _playheadPosition = [progressNumber stringValue];

  [self emitStatus];
}

@end
