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
Run `yarn android:build-lib` to achieve this, and publish using publish.sh script.

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
- Install mobile emulator, see details [here](https://developer.android.com/studio/run/managing-avds)

### Step-by-step Guide

- Run the mobile emulator
- Run `yarn android:app` in `times-components` to bundles the latest code on-the-fly once the emulator request a bundle.
- Run `./gradlew assembleGPD` in `nu-projectd-times-smartphone-android` to install the latest android app
- Open the Times app in the mobile emulator
- Enable react article features in the developer settings
- Navigate to an article page on the app
- Reload the article by pressing key `]` to load the react-native article
- To update the app to the latest times-component, update the dependancy [here](https://github.com/newsuk/nu-projectd-times-smartphone-android/blob/develop/mobile/build.gradle#L199) to the android-app version [here](https://github.com/newsuk/times-components/blob/10d3ec6dfaba08b376792fa17d6e2fced5747a7e/android-app/package.json#L3) and reinstall the app on the emulator

### Locally install Times Component library on devices

1. Check Android SDK path is exported to \$ANDROID_HOME. In Mac, android sdk is installed to ~/Library/Android/sdk by default. `export ANDROID_HOME="/Users/<USERNAME>/Library/Android/sdk"`
2. update the version in android-app package.json and chnage the android build.gradle package version correspondingly
3. Build lib `yarn android:build-lib`
4. Copy newly built android bundle to andriod repo `cp android-app/xnative/src/main/assets/index.android.bundle ../../nu-projectd-times-smartphone-android/mobile/src/main/assets/index.android.bundle`
5. before building, update the version in android-app/package.json to something that doesnt exist in nu-android, mobile/build.gradle change the version to match in the top level build.gradle add the local repo: `maven { url "../../times-components/android-app/repo"}`
6. then using android studio build the app onto the device

### Upgrade Times Component in the Android app

see [Readme](https://github.com/newsuk/nu-projectd-times-smartphone-android/blob/develop/CONTRIBUTING.md#upgrading-to-the-latest-times-component)
