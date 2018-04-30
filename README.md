# The Times Component Library

[![Coverage Status](https://coveralls.io/repos/github/newsuk/times-components/badge.svg)](https://coveralls.io/github/newsuk/times-components)
[![Build Status](https://travis-ci.org/newsuk/times-components.svg?branch=master)](https://travis-ci.org/newsuk/times-components)

### Purpose

Home of The Times' `react`/`react native` components, using
[react-native-web](https://github.com/necolas/react-native-web) to share across
platforms

### Dev Environment

We require MacOS with [Node.js](https://nodejs.org) (version >=8 with npm v5),
[yarn](https://yarnpkg.com) (latest) and
[watchman](https://facebook.github.io/watchman) installed. Native development
requires [Xcode](https://developer.apple.com/xcode),
[Android Studio](https://developer.android.com/studio/index.html) and
[JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html).

You can try without these requirements, but you'd be on your own.

## Getting Started

1. Run `yarn` to install dependencies
2. Install [fontforge](http://fontforge.github.io/en-US/): `brew install
   fontforge` (See [Fonts section](#fonts))
3. Components can be seen running in a storybook:

* web storybook
  1. `yarn storybook`
  2. go to http://localhost:9001
* native storybook
  1. `yarn storybook-native` and leave it running
  2. `yarn ios` to start the iOS app
  3. To start the Android app:
     * [Start a virtual device](https://developer.android.com/studio/run/managing-avds.html)
     * `yarn android`
     * If you get build errors, check your JDK version with `javac -version`,
       which should print `javac 1.8.XXXX`. Earlier or later versions may not
       work.
  4. go to http://localhost:7007

## Haul

We use Haul in lieu of the standard `react-native` CLI so that we can generate native Storybook bundles using Webpack, which we configure to honour our monorepo packages' respective `dev` entry points; this allows one update a package's source code and preview the changes without having to manually re-transpile. Haul also automatically generates debuggable source maps.

To debug our native Storybook:

1. `yarn storybook-native` and leave it running
2. `yarn android` or `yarn ios`
3. open the developer menu on your device (Cmd + M on Android, Cmd + D on iOS) and tap _Debug JS Remotely_
4. navigate to http://localhost:8081/debugger-ui if it hasn't opened automatically
5. open DevTools (this and the subsequent steps assume Google Chrome usage)
6. click _Sources_
7. expand _debuggerWorker.js_ => _webpack://_ => _._ => _packages_

Any of these source files can be debugged directly.


### Fonts ⚠️

In order to view the storybook on native, you'll need to fix broken fonts. This
fix is done automatically when running storybook (both web and native), but
requires that [fontforge](http://fontforge.github.io/en-US/) is installed,
otherwise the fix won't be applied and you'll get the classic red error screen
when trying to use a broken font.

## Testing and code coverage

| Tests                                      | Covered            | CI                                                            |
| ------------------------------------------ | ------------------ | ------------------------------------------------------------- |
| Unit tests, UI tests and Integration tests | :white_check_mark: | [Travis Build](https://travis-ci.org/newsuk/times-components) |
| Visual Regression tool (Dextrose)          | :white_check_mark: | Not automated                                                 |
| Functional Regression tool (Fructose)      | :white_check_mark: | Not automated                                                 |

## Contributing

See the [CONTRIBUTING.md](.github/CONTRIBUTING.md) for an extensive breakdown of
the project

`yarn commit` will commit files (same as `git commit`), and will aid the
contributor with adding a suitable commit message inline with
[conventional changelog](https://github.com/commitizen/cz-cli)
