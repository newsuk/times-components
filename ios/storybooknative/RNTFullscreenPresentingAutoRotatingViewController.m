//
//  Copyright © 2017 News UK. All rights reserved.
//

#import "RNTFullscreenPresentingAutoRotatingViewController.h"
#import "RNTFullscreenAutoPresentingView.h"

@interface RNTFullscreenPresentingAutoRotatingViewController ()

@property (nonatomic, strong) RNTFullscreenAutoPresentingView* autoPresentingView;

@end

@implementation RNTFullscreenPresentingAutoRotatingViewController

- (void)loadView {
  
  self.autoPresentingView = [[RNTFullscreenAutoPresentingView alloc] initWithViewController:self];
  self.view = self.autoPresentingView;
  
  self.modalPresentationStyle = UIModalPresentationFullScreen;
}

- (BOOL)shouldAutorotate {
  
  return YES;
  
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {

  return UIInterfaceOrientationMaskAllButUpsideDown;
  
}

- (void)showInFullscreen {
  
  [self.viewControllerToPresentFrom presentViewController:self animated:NO completion:NULL];
  
}

- (void)hideFullscreen {

  [self.viewControllerToPresentFrom dismissViewControllerAnimated:true completion:NULL];

}

@end
