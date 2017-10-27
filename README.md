# The Times Component Library
[![Coverage Status](https://coveralls.io/repos/github/newsuk/times-components/badge.svg)](https://coveralls.io/github/newsuk/times-components)
[![Build Status](https://travis-ci.org/newsuk/times-components.svg?branch=master)](https://travis-ci.org/newsuk/times-components)

### Purpose

Home of The Times' `react`/`react native` components, using
 [react-native-web](https://github.com/necolas/react-native-web) to share across platforms

### Dev Environment

We require MacOS with [Node.js](https://nodejs.org) (version >=8 with npm v5), [yarn](https://yarnpkg.com) (latest) and [watchman](https://facebook.github.io/watchman) installed. Native development requires [Xcode](https://developer.apple.com/xcode) and [Android Studio](https://developer.android.com/studio/index.html).

You can try without these requirements, but you'd be on your own.

## Getting Started

1. Run `yarn` to install dependencies
2. Install [fontforge](http://fontforge.github.io/en-US/): `brew install fontforge` (See [Fonts section](#fonts))
3. components can be seen running in a storybook:
  * web storybook
    1. `yarn storybook`
    2. go to http://localhost:9001
  * native storybook
    1. `yarn storybook-native` and leave it running
    2. `yarn ios` and/or `yarn android` to start the (sim|em)ulators
    3. go to http://localhost:7007

### Fonts ⚠️

In order to view the storybook on native, you'll need to fix a broken font. This fix is done automatically when running storybook (both web and native), but requires that [fontforge](http://fontforge.github.io/en-US/) is installed, otherwise the fix won't be applied and you may see some errors in the console.

## Contributing

See the [CONTRIBUTING.md](.github/CONTRIBUTING.md)
 for an extensive breakdown of the project
