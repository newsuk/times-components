#import <React/RCTEventDispatcher.h>
#import <React/RCTView.h>
#import <BrightcovePlayerSDK/BrightcovePlayerSDK.h>

@class RCTEventDispatcher;

@interface RNTBrightcove : UIView

@property (nonatomic, copy) NSString *policyKey;
@property (nonatomic, copy) NSString *accountId;
@property (nonatomic, copy) NSString *videoId;
@property (nonatomic, assign) BOOL *autoplay;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;
@property (nonatomic, copy) RCTBubblingEventBlock onIOSError;

- (void)playVideo;
- (void)pauseVideo;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher;

@end
