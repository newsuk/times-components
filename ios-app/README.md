# iOS-App package

Use this package to run the ios react-native development server for the
existing native application. This is useful when building components that are reliant on the
behaviour of the actual app outside of the storybook.

When ran as a development server, react-native launches a webpack server that bundles
components on-the-fly. Launch the app in debug mode to connect to development
server.

When bundled, it gets assembled as a native ios library, including the js
bundle, image assets and native dependencies.

## Dev Server

In order to run the dev server, either run `yarn ios:app` in the repo root
or `yarn start` inside this package. This will start react-native bundler and provide
on-the-fly bundles for the react development.

## How to get the ios app set up and running on latest times-components

### Prerequisites

- Get the latest code on `develop` for [nu-digital-projectd-times-smartphone-ios](https://github.com/newsuk/nu-digital-projectd-times-smartphone-ios)
- Get the latest Xcode [here](https://developer.apple.com/xcode/)

### Step-by-step Guide

- Run `yarn ios:app` in `times-components` to bundles the latest code on-the-fly once the emulator request a bundle.
- Open `TheTimesProjectD.xcworkspace` from [nu-digital-projectd-times-smartphone-ios](https://github.com/newsuk/nu-digital-projectd-times-smartphone-ios) in Xcode.
- In Xcode, click `TheTimes` next to the play/stop icons.
- Edit Scheme... -> Run -> Arguments -> Tick the `REACT_DEV_DEBUG_MODE` checkbox.
- Run the application with Xcode.
- Go to Settings in the app. Tap 7 times `Version`. Tap `Debug` when it appears. Enable React Native Flags.
- Open React-Native articles and enjoy.
