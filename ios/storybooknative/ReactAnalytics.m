#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface ReactAnalytics : NSObject <RCTBridgeModule>
@end

@implementation ReactAnalytics

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(track:(NSString *) data)
{
  NSLog(@"track %@", data);
}

@end
