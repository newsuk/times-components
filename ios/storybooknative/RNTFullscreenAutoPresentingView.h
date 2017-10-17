//
//  Copyright © 2017 News UK. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNTFullscreenAutoPresentingView: UIView

@property (nonatomic, weak) RNTFullscreenPresentingAutoRotatingViewController* viewController;

- (instancetype)initWithViewController:(RNTFullscreenPresentingAutoRotatingViewController *)viewController;

@end
