#import <React/RCTEventDispatcher.h>
#import <React/RCTView.h>
#import <BrightcovePlayerSDK/BrightcovePlayerSDK.h>

@class RCTEventDispatcher;

@interface RNTBrightcove : UIView

@property (nonatomic, assign) NSString *policyKey;
@property (nonatomic, assign) NSString *accountId;
@property (nonatomic, assign) NSString *videoId;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;
@property (nonatomic, copy) RCTBubblingEventBlock onIOSError;

- (void)playVideo;
- (void)pauseVideo;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher;

@end
