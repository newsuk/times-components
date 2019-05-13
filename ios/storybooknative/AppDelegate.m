/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  NSURL *bundleJSLocation;
  NSURL *packagerJSLocation;
  NSURL *jsCodeLocation;

  bundleJSLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  packagerJSLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.storybook" fallbackResource:nil];

  if (bundleJSLocation) {
    jsCodeLocation = bundleJSLocation;
  } else {
    jsCodeLocation = packagerJSLocation;
  }

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"storybooknative"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
