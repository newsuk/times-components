#import <UIKit/UIKit.h>

@interface RNTFullscreenAutoPresentingView: UIView

@property (nonatomic, weak) RNTFullscreenPresentingAutoRotatingViewController* viewController;

- (instancetype)initWithViewController:(RNTFullscreenPresentingAutoRotatingViewController *)viewController;

@end
