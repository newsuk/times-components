#import <React/RCTEventDispatcher.h>
#import <React/RCTView.h>
#import <BrightcovePlayerSDK/BrightcovePlayerSDK.h>

@class RCTEventDispatcher;

@interface RNTBrightcove : UIView

@property (nonatomic, assign) NSString *policyId;
@property (nonatomic, assign) NSString *accountId;
@property (nonatomic, assign) NSString *videoId;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
