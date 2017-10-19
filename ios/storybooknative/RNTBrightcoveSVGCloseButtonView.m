
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
  
  CATransform3D scaleTransform = CATransform3DMakeScale(0.3, 0.3, 1);
  
  circleLayer.fillColor = [[UIColor grayColor] CGColor];
  crossLayer.fillColor = [[UIColor whiteColor] CGColor];
  
  [circleLayer setPath: [self createCircularBezierPath]];
  [crossLayer setPath: [self createCrossBezierPath]];
  
  circleLayer.transform = scaleTransform;
  crossLayer.transform = scaleTransform;
  
  [self.layer addSublayer: circleLayer];
  [self.layer addSublayer: crossLayer];
}


- (CGPathRef)createCircularBezierPath {
  UIBezierPath* bezierPath = [UIBezierPath bezierPath];
  [bezierPath moveToPoint: CGPointMake(90.4, 8.2)];
  [bezierPath addLineToPoint: CGPointMake(90.73, 8.4)];
  [bezierPath addCurveToPoint: CGPointMake(112.14, 30.19) controlPoint1: CGPointMake(99.6, 13.73) controlPoint2: CGPointMake(106.97, 21.23)];
  [bezierPath addLineToPoint: CGPointMake(111.56, 29.19)];
  [bezierPath addCurveToPoint: CGPointMake(120, 59.64) controlPoint1: CGPointMake(117.08, 38.39) controlPoint2: CGPointMake(120, 48.91)];
  [bezierPath addLineToPoint: CGPointMake(120, 60.36)];
  [bezierPath addCurveToPoint: CGPointMake(111.56, 90.81) controlPoint1: CGPointMake(120, 71.09) controlPoint2: CGPointMake(117.08, 81.61)];
  [bezierPath addLineToPoint: CGPointMake(111.6, 90.73)];
  [bezierPath addCurveToPoint: CGPointMake(89.82, 112.14) controlPoint1: CGPointMake(106.27, 99.6) controlPoint2: CGPointMake(98.78, 106.97)];
  [bezierPath addLineToPoint: CGPointMake(90.8, 111.56)];
  [bezierPath addCurveToPoint: CGPointMake(60.37, 120) controlPoint1: CGPointMake(81.61, 117.08) controlPoint2: CGPointMake(71.09, 120)];
  [bezierPath addLineToPoint: CGPointMake(59.63, 120)];
  [bezierPath addCurveToPoint: CGPointMake(29.2, 111.57) controlPoint1: CGPointMake(48.91, 120) controlPoint2: CGPointMake(38.39, 117.09)];
  [bezierPath addLineToPoint: CGPointMake(29.24, 111.59)];
  [bezierPath addCurveToPoint: CGPointMake(7.88, 89.85) controlPoint1: CGPointMake(20.39, 106.27) controlPoint2: CGPointMake(13.04, 98.79)];
  [bezierPath addLineToPoint: CGPointMake(8.44, 90.8)];
  [bezierPath addCurveToPoint: CGPointMake(-0, 60.37) controlPoint1: CGPointMake(2.92, 81.61) controlPoint2: CGPointMake(-0, 71.09)];
  [bezierPath addLineToPoint: CGPointMake(-0, 59.63)];
  [bezierPath addCurveToPoint: CGPointMake(8.44, 29.2) controlPoint1: CGPointMake(-0, 48.91) controlPoint2: CGPointMake(2.92, 38.39)];
  [bezierPath addLineToPoint: CGPointMake(8.4, 29.27)];
  [bezierPath addCurveToPoint: CGPointMake(30.19, 7.86) controlPoint1: CGPointMake(13.73, 20.4) controlPoint2: CGPointMake(21.23, 13.03)];
  [bezierPath addLineToPoint: CGPointMake(29.19, 8.44)];
  [bezierPath addCurveToPoint: CGPointMake(59.64, -0) controlPoint1: CGPointMake(38.39, 2.92) controlPoint2: CGPointMake(48.91, -0)];
  [bezierPath addLineToPoint: CGPointMake(60.36, -0)];
  [bezierPath addCurveToPoint: CGPointMake(90.81, 8.45) controlPoint1: CGPointMake(71.09, -0) controlPoint2: CGPointMake(81.61, 2.92)];
  [bezierPath addLineToPoint: CGPointMake(90.4, 8.2)];
  [bezierPath closePath];

  return bezierPath.CGPath;
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

