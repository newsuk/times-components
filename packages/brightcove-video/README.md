# Times Component - Brightcove Video

The integration with [react-native-web](https://github.com/necolas/react-native-web) has NOT been tested on our end.

# Native

## Getting started

* `yarn add @times-components/brightcove-video`
* `react-native link`

:warning: For native, the `policyKey` is required, see [Brightcove's Policy API](https://docs.brightcove.com/en/video-cloud/policy-api/getting-started/api-overview.html) for more details.

## iOS Install of the Brightcove SDK

### Install with Cocoapods

Add the 2 following lines to the top of your `ios/Podfile`

```
source 'https://github.com/CocoaPods/Specs.git' # Add if you have other pods in your Podfile
source 'https://github.com/brightcove/BrightcoveSpecs.git'
```

and in your main Target, add :

```
pod 'Brightcove-Player-Core'
```

Then update your master repo to have the specs for Brightcove Player

```
pod repo update
```

### Install Manually

To install the Brightcove SDK, follow Brightcove's instructions found [here](https://github.com/brightcove/brightcove-player-sdk-ios#manual). We recommend using `v5.3.3`, however any recent version should be fine.

## Android install of the Brightcove SDK

Add the following line to your `android/app/build.gradle`

```
repositories {
   maven { url 'http://repo.brightcove.com/releases' }
}
```

## Props

Properties types are defined in `./brightcove-video.proptypes.js`

| Property name | Property type | Comment
| --- | --- | ---
| `videoId` | string (required) | ID of the Brightcove video
| `accountId` | string (required) | ID of the Brightcove account
| `policyKey` | string | policy key (native only)
| `playerId` | string | ID of the player (web only)
| `width` | number | width of the player
| `height` | number | height of the player
| `onError` | function | Handle errors
| `onChange` | function |
| `autoplay` | boolean | Should the video autoplay

## Usage

```
import BrightcoveVideo from '@times-component/brightcove-video';

...

<BrightcoveVideo
    accountId={BRIGHTCOVE_ACCOUNT_ID}
    videoId={BRIGHTCOVE_ACCOUNT_ID}
    width={320}
    height={70}
    onError={console.error}
    policyKey={BRIGHTCOVE_POLICY_KEY} // Required for native
    autoplay={true}
/>

```
