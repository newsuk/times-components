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
  
  CGAffineTransform scaleTransform = CGAffineTransformMakeScale(buttonScale, buttonScale);
  
  circleLayer.fillColor = [[UIColor grayColor] CGColor];
  crossLayer.fillColor = [[UIColor whiteColor] CGColor];
  
  [circleLayer setPath: [self createCircularBezierPath]];
  [crossLayer setPath: [self createCrossBezierPath]];
  
  circleLayer.affineTransform = scaleTransform;
  
  [self.layer addSublayer: circleLayer];
  [circleLayer addSublayer: crossLayer];
  
  crossLayer.position = circleLayer.position;
}

- (CGPathRef)createCircularBezierPath {
  int radius = 60;

  return [[UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, radius * 2, radius * 2)] CGPath];
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

