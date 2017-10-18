//
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNTBrightcoveViewController.h"


@interface RNTBrightcoveCloseButtonView: UIView

@property (nonatomic, weak) id<RNTBrightcoveCloseButtonViewDelegate> delegate;
@property (nonatomic, strong) UIButton *closeButton;

@end

@implementation RNTBrightcoveCloseButtonView

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
  self = [super initWithCoder: aDecoder];
  [self configureCloseButton];
  
  return self;
}

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  [self configureCloseButton];
  
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  
  if (![self.closeButton superview]) {
    [[self findBCOVPUIOverlayViewBelow:self] addSubview:self.closeButton];
  }
}

- (void)configureCloseButton {
  
  UIButton * closeButton = [UIButton buttonWithType:(UIButtonTypeCustom)];
  [closeButton setTitle:@"X" forState:(UIControlStateNormal)];
  [closeButton setFrame:CGRectMake(20, 20, 44, 44)];
  
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

#pragma mark -

@implementation RNTBrightcoveViewController

- (void)loadView {

  RNTBrightcoveCloseButtonView *bcView = [[RNTBrightcoveCloseButtonView alloc] initWithFrame: CGRectZero];
  bcView.delegate = self;
  self.view = bcView;
}


- (void)closeButtonTapped {
  if ([self presentingViewController]) {
    [[self presentingViewController] dismissViewControllerAnimated:YES completion:NULL];
  }
}

@end
