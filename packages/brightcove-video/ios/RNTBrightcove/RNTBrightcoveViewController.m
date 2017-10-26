
#import "RNTBrightcoveViewController.h"
#import "RNTBrightcoveSVGCloseButtonView.h"
#import "RNTBrightcoveView.h"

@interface RNTBrightcoveViewController ()
@property (nonatomic, weak) RNTBrightcoveView* videoView;
@end

@implementation RNTBrightcoveViewController

- (void)loadView {
    
    RNTBrightcoveCloseButtonView *bcView = [[RNTBrightcoveCloseButtonView alloc] initWithFrame: CGRectZero];
    bcView.delegate = self;
    self.view = bcView;
}

#pragma mark - RNTBrightcoveCloseButtonViewDelegate

- (void)closeButtonTapped {
    if ([self presentingViewController]) {
        [self.videoView pauseVideo];
        [[self presentingViewController] dismissViewControllerAnimated:YES completion:NULL];

        __weak typeof(self) weakSelf = self;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [weakSelf destroyVideoView];
        });
    }
}

- (void)addVideoView:(RNTBrightcoveView *)videoView {
    
    if (videoView) {
        [self.view addSubview:videoView];
        self.videoView = videoView;
    }
}

- (void)destroyVideoView {
    
    [self.videoView removeFromSuperview];
    self.videoView = nil;
}

@end
