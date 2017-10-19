#import <UIKit/UIKit.h>
#import "RNTBrightcoveSVGCloseButtonView.h"

@implementation RNTBrightcoveSVGCloseButtonView

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  
  [self setUp];
  
  return self;
}

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
  self = [super initWithCoder:aDecoder];
  
  [self setUp];
  return self;
}

- (void)setUp {
  CAShapeLayer* circleLayer = [CAShapeLayer new];
  CAShapeLayer* crossLayer = [CAShapeLayer new];

  CGFloat buttonSize = 35;
  CGFloat buttonScale = buttonSize / 120;
  
  [crossLayer setFillColor: [[UIColor whiteColor] CGColor]];
  [crossLayer setPath: [self createCrossBezierPath]];

  CGAffineTransform scaleTransform = CGAffineTransformMakeScale(buttonScale, buttonScale);

  [circleLayer setPath: [self createCircularBezierPath]];

  [circleLayer setFillColor: [[UIColor blackColor] colorWithAlphaComponent: 0.39].CGColor];
  [circleLayer setStrokeColor: [[UIColor whiteColor] colorWithAlphaComponent: 0.39].CGColor];
  [circleLayer setLineWidth: 1];
  [circleLayer setAffineTransform: scaleTransform];
  
  [circleLayer addSublayer: crossLayer];
  [self.layer addSublayer: circleLayer];
}

- (CGPathRef)createCircularBezierPath {
  CGRect rect = CGRectMake(0, 0, 120, 120);
  return [[UIBezierPath bezierPathWithOvalInRect: rect] CGPath];
}

- (CGPathRef)createCrossBezierPath {
  UIBezierPath *bezierPath = UIBezierPath.bezierPath;
  
  [bezierPath moveToPoint: CGPointMake(70, 60)];
  [bezierPath addLineToPoint: CGPointMake(92, 30.8)];
  [bezierPath addLineToPoint: CGPointMake(89.2, 28)];
  [bezierPath addLineToPoint: CGPointMake(60, 50)];
  [bezierPath addLineToPoint: CGPointMake(30.8, 28)];
  [bezierPath addLineToPoint: CGPointMake(28, 30.8)];
  [bezierPath addLineToPoint: CGPointMake(50, 60)];
  [bezierPath addLineToPoint: CGPointMake(28, 89.2)];
  [bezierPath addLineToPoint: CGPointMake(30.8, 92)];
  [bezierPath addLineToPoint: CGPointMake(60, 70)];
  [bezierPath addLineToPoint: CGPointMake(89.2, 92)];
  [bezierPath addLineToPoint: CGPointMake(92, 89.2)];
  [bezierPath addLineToPoint: CGPointMake(70, 60)];
  [bezierPath closePath];
  
  return bezierPath.CGPath;
}

@end

