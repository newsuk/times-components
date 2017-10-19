
#import "RNTBrightcoveViewController.h"
#import "RNTBrightcoveSVGCloseButtonView.h"

@implementation RNTBrightcoveViewController

- (void)loadView {

  RNTBrightcoveCloseButtonView *bcView = [[RNTBrightcoveCloseButtonView alloc] initWithFrame: CGRectZero];
  bcView.delegate = self;
  self.view = bcView;
}

#pragma mark - RNTBrightcoveCloseButtonViewDelegate

- (void)closeButtonTapped {
  if ([self presentingViewController]) {
    [[self presentingViewController] dismissViewControllerAnimated:YES completion:NULL];
  }
}

@end

