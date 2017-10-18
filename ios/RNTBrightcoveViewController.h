//
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol RNTBrightcoveCloseButtonViewDelegate
- (void)closeButtonTapped;
@end

@interface RNTBrightcoveViewController : UIViewController <RNTBrightcoveCloseButtonViewDelegate>

- (void)closeButtonTapped;

@end
