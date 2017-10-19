
#import "RNTBrightcoveCloseButtonView.h"
#import "RNTBrightcoveSVGCloseButtonView.h"

@implementation RNTBrightcoveCloseButtonView

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
  self = [super initWithCoder: aDecoder];
  
  if (self) {
    [self configureCloseButton];
  }
  
  return self;
}

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  
  if (self) {
    [self configureCloseButton];
  }
  
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  
  BOOL closeButtonHasSuperview = [self.closeButton superview] ? YES : NO;
  
  if (!closeButtonHasSuperview) {
    UIView *foundView = [self findBCOVPUIOverlayViewBelow:self];
    
    if (foundView) {
      [foundView addSubview:self.closeButton];
    }
  }
}

- (void)configureCloseButton {
  UIButton * closeButton = [UIButton buttonWithType:(UIButtonTypeCustom)];
  
  [closeButton setFrame:CGRectMake(20, 20, 44, 44)];
  [closeButton addSubview:[[RNTBrightcoveSVGCloseButtonView alloc] initWithFrame: closeButton.bounds]];
  [closeButton addTarget:self action:@selector(closeButtonTapped:) forControlEvents:UIControlEventTouchUpInside];
  
  self.closeButton = closeButton;
}

- (void)closeButtonTapped:(UIButton *)sender {
  if (self.delegate) {
    [self.delegate closeButtonTapped];
  }
}

- (UIView *)findBCOVPUIOverlayViewBelow:(UIView *) startView {
  
  NSString *typeName = NSStringFromClass([startView class]);
  
  if ([@"BCOVPUIOverlayView" isEqualToString:typeName]) {
    return startView;
  }
  
  for (UIView *childView in [startView subviews]) {
    UIView * matchedChildView = [self findBCOVPUIOverlayViewBelow:childView];
    if (matchedChildView) {
      return matchedChildView;
    }
  }
  
  return nil;
  
}

@end
