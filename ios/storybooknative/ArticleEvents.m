#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface ArticleEvents : NSObject <RCTBridgeModule>
@end

@implementation ArticleEvents

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(onArticlePress:(NSString *) url)
{
  NSLog(@"onArticlePress %@", url);
}

RCT_EXPORT_METHOD(onArticleLoaded:(NSString *) articleId extras:(id) extras)
{
  NSLog(@"onArticleLoaded %@ %@", articleId, extras);
}

RCT_EXPORT_METHOD(onAuthorPress:(NSString *) slug)
{
  NSLog(@"onAuthorPress %@", slug);
}

RCT_EXPORT_METHOD(onLinkPress:(NSString *) url)
{
  NSLog(@"onLinkPress %@", url);
}

RCT_EXPORT_METHOD(onVideoPress:(id) videoInfo)
{
  NSLog(@"onVideoPress %@", videoInfo);
}

RCT_EXPORT_METHOD(onTopicPress:(NSString *) url)
{
  NSLog(@"onTopicPress %@", url);
}

RCT_EXPORT_METHOD(onCommentsPress:(NSString *) articleId url:(NSString *) url)
{
  NSLog(@"onCommentsPress %@ %@", articleId, url);
}

RCT_EXPORT_METHOD(onCommentGuidelinesPress)
{
  NSLog(@"onCommentGuidelinesPress");
}
@end
