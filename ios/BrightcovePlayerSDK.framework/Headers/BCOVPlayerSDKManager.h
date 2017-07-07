//
// BCOVPlayerSDKManager.h
// BrightcovePlayerSDK
//
// Copyright (c) 2017 Brightcove, Inc. All rights reserved.
// License: https://accounts.brightcove.com/en/terms-and-conditions
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <BrightcovePlayerSDK/BCOVPlaybackController.h>

@class BCOVBasicSessionProviderOptions;
@protocol BCOVComponent;
@protocol BCOVPlaybackSessionProvider;


/**
 * The Player SDK Manager is a singleton instance that acts as a factory,
 * central registry, and diagnostics center in the Brightcove Player SDK for
 * iOS. After obtaining an instance of the Manager, use it to obtain instances
 * of other objects from the Player SDK ecosystem.
 */
@interface BCOVPlayerSDKManager : NSObject

/**
 * Creates and returns a playback controller configured with a basic session
 * provider and a default view strategy (equivalent to calling
 * `-[BCOVPlayerSDKManager createPlaybackControllerWithViewStrategy:nil]`).
 *
 * @return A playback controller.
 */
- (id<BCOVPlaybackController>)createPlaybackController;

/**
 * Creates and returns a playback controller configured with a basic session
 * provider and the specified view strategy. Passing `nil` as the view strategy
 * will configure the returned playback controller's `view` property as a basic
 * unadorned video view.
 *
 * @param viewStrategy A view strategy that determines the view for the returned
 * playback controller.
 * @return A playback controller configured with the specified strategy.
 */
- (id<BCOVPlaybackController>)createPlaybackControllerWithViewStrategy:(BCOVPlaybackControllerViewStrategy)viewStrategy;

/**
 * Creates and returns a playback controller configured with the specified
 * session provider and view strategy.
 *
 * @param provider A session provider that vends playback sessions to the
 * returned playback controller.
 * @param viewStrategy A view strategy that determines the view for the
 * returned playback controller.
 * @return A playback controller configured with the specified parameters.
 */
- (id<BCOVPlaybackController>)createPlaybackControllerWithSessionProvider:(id<BCOVPlaybackSessionProvider>)provider viewStrategy:(BCOVPlaybackControllerViewStrategy)viewStrategy;

/**
 * Returns a basic playback session provider with the specified options.
 *
 * @param options The options for the session provider to return.
 * @return A basic playback session provider configured with the specified
 * options.
 */
- (id<BCOVPlaybackSessionProvider>)createBasicSessionProviderWithOptions:(BCOVBasicSessionProviderOptions *)options;

/**
 * Returns a view strategy that wraps the video view it is given with the
 * default playback controls.
 *
 * This view strategy is intended to provide a "stock" set of controls to aid
 * development, testing, and Brightcove code samples.
 *
 * @return A view strategy block that wraps the video view with stock controls.
 */
- (BCOVPlaybackControllerViewStrategy)defaultControlsViewStrategy __attribute__((deprecated("Use the built-in PlayerUI controls instead; see the README for details")));

/**
 * Registers the specified component object with the BCOVPlayerSDKManager. The
 * component should implement the methods in the `BCOVComponent` protocol.
 * Registering a component "activates it" for use, enabling its functionality.
 *
 * @param component The object to be registered with the BCOVPlayerSDKManager.
 */
- (void)registerComponent:(id<BCOVComponent>)component;

/**
 * Returns the Player SDK Manager singleton.
 *
 * @return The Player SDK Manager singleton.
 */
+ (BCOVPlayerSDKManager *)sharedManager;

@end



/**
 * Identifies a BCOVComponent to the BCOVPlayerSDKManager.
 */
@protocol BCOVComponentIdentity <NSObject>

/**
 * A concrete class which uniquely identifies an object that conforms to the
 * BCOVComponent protocol.
 */
@property (nonatomic, readonly) Class componentClass;

/**
 * An identifier which uniquely identifies a specific version of an object that
 * conforms to the BCOVComponent protocol. This identifier should be updated
 * whenever a new version of the component is released, to help in identifying
 * which specific components have been registered with the BCOVPlayerSDKManager.
 */
@property (nonatomic, readonly) NSString *versionIdentifier;

@end



/**
 * Objects which must be registered with the BCOVPlayerSDKManager in order to
 * activate their functionality should conform to the BCOVComponent protocol.
 */
@protocol BCOVComponent <NSObject>

/**
 * Uniquely identifies this component with the returned component identity.
 */
@property (nonatomic, readonly) id<BCOVComponentIdentity> bcov_componentIdentity;


@optional

/**
 * This method allows the BCOVPlayerSDKManager to supply contextual information
 * to this component when it is registered.
 *
 * @param componentContext The contextual information to be communicated to this component.
 */
- (void)bcov_setComponentContext:(NSDictionary *)componentContext;

@end
