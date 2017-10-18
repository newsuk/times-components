#import <Foundation/Foundation.h>

#import "RNTFullscreenPresentingAutoRotatingViewController.h"
#import "RNTFullscreenAutoPresentingView.h"

@implementation RNTFullscreenAutoPresentingView

- (instancetype)initWithViewController:(RNTFullscreenPresentingAutoRotatingViewController *)viewController {
  
  self = [super init];
  
  if (self) {
    self.viewController = viewController;
  }
  return self;
}

- (void)didAddSubview:(UIView *)subview {
  
  [super didAddSubview:subview];
  
  if (self.viewController) {
    [self.viewController showInFullscreen];
  }
}

- (void)willRemoveSubview:(UIView *)subview {
  [super willRemoveSubview:subview];
  
  [self.viewController hideFullscreen];
}

@end
