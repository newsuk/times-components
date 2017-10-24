
#import <UIKit/UIKit.h>
#import "RNTBrightcoveCloseButtonView.h"

@class RNTBrightcoveView;

@interface RNTBrightcoveViewController : UIViewController <RNTBrightcoveCloseButtonViewDelegate>

- (void)closeButtonTapped;
- (void)addVideoView:(RNTBrightcoveView *)videoView;

@end
