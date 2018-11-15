#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface AuthorProfileEvents : NSObject <RCTBridgeModule>
@end

@implementation AuthorProfileEvents

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(onArticlePress:(NSString *) url)
{
  NSLog(@"onArticlePress %@", url);
}

@end
