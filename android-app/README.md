# Android-App package

Use this package to run the android react-native development server for the
existing native application, or to bundle a native library for android app
releases. This is useful when building components that are reliant on the
behaviour of the actual app outside of the storybook.

When ran as a development server, haul launches a webpack server that bundles
components on-the-fly. Launch the app in debug mode to connect to development
server.

When bundled, it gets assembled as a native android library, including the js
bundle, image assets and native dependencies.

## Dev Server

In order to run the dev server, either run `yarn android:app` in the repo root
or `yarn start` inside this package. This will start Haul bundler and provide
on-the-fly bundles for the react development.

## Bundling and release

To publish this repo to maven, it needs to be built as a native android library.
Run `yarn bundle:all` to achieve this, and publish using publish.sh script.

This bundling process first creates the js bundle, puts it inside an android
library and assembles the android library, alongside any native dependencies.
All native dependencies and the xnative library should be published to maven so
it can be consumed by the native applications.

## Adding new native dependencies

Whenever a native dependency is added to times-components, it should also be
added to this package and `build.gradle` scripts should be updated. Add the
library name to `reactProjects` in build.gradle so it can be bundled and
uploaded to maven.
