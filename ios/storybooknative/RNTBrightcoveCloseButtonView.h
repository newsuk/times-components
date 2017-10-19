
#import <UIKit/UIKit.h>

@class RNTBrightcoveSVGCloseButtonView;

@protocol RNTBrightcoveCloseButtonViewDelegate
- (void)closeButtonTapped;
@end

@interface RNTBrightcoveCloseButtonView: UIView

@property (nonatomic, weak) id<RNTBrightcoveCloseButtonViewDelegate> delegate;
@property (nonatomic, strong) UIButton *closeButton;
@property (nonatomic, strong) RNTBrightcoveSVGCloseButtonView* closeButtonView;

@end

