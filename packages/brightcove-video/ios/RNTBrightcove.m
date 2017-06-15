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

@implementation RNTBrightcove : UIView {
  RCTEventDispatcher *_eventDispatcher;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher {
  if ((self = [super init])) {
    _eventDispatcher = eventDispatcher;
  }

  return self;
}

- (void)setup {
  BCOVPlayerSDKManager *manager = [BCOVPlayerSDKManager sharedManager];

  _playbackController = [manager createPlaybackController];
  _playbackController.delegate = self;
  _playbackController.autoAdvance = YES;
  _playbackController.autoPlay = YES;

  _playbackService = [[BCOVPlaybackService alloc] initWithAccountId:_accountId
                                                          policyKey:_policyId];
}

- (void)requestContentFromPlaybackService {
  [self.playbackService findVideoWithVideoID:_videoId parameters:nil completion:^(BCOVVideo *video, NSDictionary *jsonResponse, NSError *error) {
    if (video) {
      [self.playbackController setVideos:@[ video ]];
    } else {
      NSLog(@"ViewController Debug - Error retrieving video playlist: `%@`", error);
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
  if (_policyId && _accountId && _videoId) {
    [self setup];

    BCOVPUIBasicControlView *controlsView = [BCOVPUIBasicControlView basicControlViewWithVODLayout];

    BCOVPUIPlayerViewOptions *options = [[BCOVPUIPlayerViewOptions alloc] init];

    BCOVPUIPlayerView *playerView = [[BCOVPUIPlayerView alloc] initWithPlaybackController:self.playbackController options:options controlsView:controlsView ];
    playerView.delegate = self;

    playerView.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;

    _playerView = playerView;
    _playerView.playbackController = _playbackController;

    [self requestContentFromPlaybackService];
  }
}

- (void)setPolicyId:(NSString *)policyId {
  if (![policyId isEqual:_policyId]) {
    _policyId = [policyId copy];
    [self initPlayerView];
  }
}

- (void)setAccountId:(NSString *)accountId {
  if (![accountId isEqual:_accountId]) {
    _accountId = [accountId copy];
    [self initPlayerView];
  }
}

- (void)setVideoId:(NSString *)videoId {
  if (![videoId isEqual:_videoId]) {
    _videoId = [videoId copy];
    [self initPlayerView];
  }
}

@end
