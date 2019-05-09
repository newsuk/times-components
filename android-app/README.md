# Android-App package

Use this package to run the android react-native development server for the
existing native application, or to bundle a native library for android app
releases. This is useful when building components that are reliant on the
behaviour of the actual app outside of the storybook.

When ran as a development server, react-native launches a webpack server that bundles
components on-the-fly. Launch the app in debug mode to connect to development
server.

When bundled, it gets assembled as a native android library, including the js
bundle, image assets and native dependencies.

## Dev Server

In order to run the dev server, either run `yarn android:app` in the repo root
or `yarn start` inside this package. This will start react-native bundler and provide
on-the-fly bundles for the react development.

## Bundling and release

To publish this repo to maven, it needs to be built as a native android library.
Run `yarn build:all` to achieve this, and publish using publish.sh script.

This bundling process first creates the js bundle, puts it inside an android
library and assembles the android library, alongside any native dependencies.
All native dependencies and the xnative library should be published to maven so
it can be consumed by the native applications.

## Adding new native dependencies

Whenever a native dependency is added to times-components, it should also be
added to this package and `build.gradle` scripts should be updated. Add the
library name to `reactProjects` in build.gradle so it can be bundled and
uploaded to maven.

## How to get the android app set up and running on latest times-components

### Prerequisites

- Get the latest code on `develop` for [nu-projectd-times-smartphone-android](https://github.com/newsuk/nu-projectd-times-smartphone-android)
- Get the latest Android Studio [here](https://developer.android.com/studio/)
- Install mobile emulater, see details [here](https://developer.android.com/studio/run/managing-avds)

### Step-by-step Guide

- Run the mobile emulator
- Run `yarn android:app` in `times-component` to bundles the latest code on-the-fly once the emulator request a bundle.
- Run `./gradlew assembleGPD` in `nu-projectd-times-smartphone-android` to install the latest android app
- Open the Times app in the mobile emulator
- Enable react article features in the developer settings
- Navigate to an article page on the app
- Reload the article by pressing key `]` to load the react-native article
- To update the app to the latest times-component, update the dependancy [here](https://github.com/newsuk/nu-projectd-times-smartphone-android/blob/develop/mobile/build.gradle#L197) to the android-app version [here](https://github.com/newsuk/times-components/blob/10d3ec6dfaba08b376792fa17d6e2fced5747a7e/android-app/package.json#L3) and reinstall the app on the emulator
