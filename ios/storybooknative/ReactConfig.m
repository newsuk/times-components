#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface ReactConfig : NSObject <RCTBridgeModule>
@end

@implementation ReactConfig

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{ @"operatingSystemVersion": @"",
            @"deviceId":@"",
            @"cookieEid":@"",
            @"isLoggedIn":@"",
            @"graphqlEndPoint":@"https://api.thetimes.co.uk/graphql",
            @"adNetworkId":@"25436805",
            @"timezone":@""
            };
}

@end

