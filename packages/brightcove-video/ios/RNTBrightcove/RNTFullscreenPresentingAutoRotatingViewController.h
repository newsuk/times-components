#import <UIKit/UIKit.h>

@interface RNTFullscreenPresentingAutoRotatingViewController : UIViewController

@property (nonatomic, weak)UIViewController* viewControllerToPresentFrom;

- (void)showInFullscreen;
- (void)hideFullscreen;

@end
