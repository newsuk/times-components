# The Times Component Library
[![Coverage Status](https://coveralls.io/repos/github/newsuk/times-components/badge.svg?branch=add-coverage)](https://coveralls.io/github/newsuk/times-components?branch=add-coverage)

### Purpose

Home of The Times' `react`/`react native` components, using
 [react-native-web](https://github.com/necolas/react-native-web) to share across platforms

### Dev Environment

We require MacOS with [node.js](https://nodejs.org), [yarn](https://yarnpkg.com) and [watchman](https://facebook.github.io/watchman) installed. Native development requires [Xcode](https://developer.apple.com/xcode) and [Android Studio](https://developer.android.com/studio/index.html).

You can try without these requirements, but you'd be on your own.

## Getting Started

1. Run `yarn` to install dependencies
2. components can be seen running in a storybook:
  * web storybook
    1. `yarn storybook`
    2. go to http://localhost:9001
  * native storybook
    1. `yarn storybook-native` and leave it running
    2. `yarn ios` and/or `yarn android` to start the (sim|em)ulators
    3. go to http://localhost:7007

## Contributing

See the [CONTRIBUTING.md](.github/CONTRIBUTING.md)
 for an extensive breakdown of the project
