Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to get issues organised and PRs merged faster!

## Core Ideas

* Components should work across all platforms (web, iOS, Android) to the same
  level of minimum functionality (as determined by UX). This is to ensure that
  master is always in a releasable state and app projects can use our components
  with confidence. To enable this we're using
  [react-native-web](https://github.com/necolas/react-native-web)
* Components should provide a suite of sensible events for their interactions.
  This will allow metric components to report back for a given context
* Screenshots are required for visual changes on web, iOS and Android. Pictures
  are worth a thousand words
* Only add components that are wanted. They should form part of a larger feature
  and not be added in isolation because they might be useful in the future
* Use React perf and Chrome dev tools to identify issues AFTER the code is
  functionally complete

### Convention

* In general we use [yarn](https://yarnpkg.com/en/), add a yarn.lock file and
  keep it up to date for faster builds
* We use [flow](https://flow.org/) and
  [Prettier](https://github.com/prettier/prettier) to ensure code consistency
  and reliability, this pattern should also be followed to avoid typical dev
  bike-shedding

### Heuristics

We're using [lerna](https://github.com/lerna/lerna) for the monorepo with each
component in it's own package that should stand alone with it's own tests and
react story etc. A component is published in two ways. A compiled `dist` version
for Native, so the platform doesn't need to worry about various Babel configs,
and a `rnw.js` bundle for web. The `package.json` `main` points at the `dist`
entrypoint and relative paths are used to access the `rnw` bundle.

For ease of use there is a CLI for creating a component. This is the quickest
way to create a package with the required scaffolding which is; a
component,`package.json`, stubbed test and showcase/story. Note that the stubbed
test will fail until a snapshot is created with`jest --updateSnapshot`or a test
run is made without the`--CI` flag.

To use this, in the root of the project run: `./times-components create
component ComponentName "Component Description"`

When developing a component it's easiest to use the
[storybooks](https://github.com/storybooks/storybook) with hot reloading. Make
sure you follow the
[React Native instructions](https://facebook.github.io/react-native/docs/getting-started.html)
to get up and running first. See [README.md](../README.md) for commands to run
the storybook.

### Development gotchas

## Dynamic Styled Components

We use
[styled-components](https://github.com/styled-components/styled-components) to
give us the ability to use media queries and keyframes to improve both UX and
DX. This allows us to server-side-render pages but provide different experiences
without the need for JavaScript.

It is possible to dynamically create a `styled-component` at runtime but this
leads to poor SSR performance. On the server, one instance of the component will
be created and on the client another, which breaks the benefits of hydration and
would result in another render. Avoid this pattern and use control flow to
choose a specific `styled-component` instead.

## Style Object Literals

We use `react-native-web` to compile our React Native components to web friendly
React. This relies on aggregating the given React Native styles and converting
them into CSS classes. Not only is it best practice to
[use a stylesheet](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/style.md#defining-styles)
whenever creating styles, it's also mandatory for hydration of SSR code. When
using object literals, the styles can be incorrectly aggregated on the server
and the client due to the different JS objects.

> #### Caution
>
> There are some problems regarding the usage of native storybooks with the
> Android simulator, mainly with hot module reloading (HMR). To take full
> advantage of HMR while developing components while testing with storybooks use
> the iOS simulator instead.

`npm run storybook:build` will output the built web storybook into the default
`storybook-static` folder that is synced to the `gh_pages` branch to demo the
components in the web

When the CI passes `packages:publish` will be run that uses
[conventional commits](https://conventionalcommits.org/) to bump to the correct
semver version, create a CHANGELOG and push to the `@times-components` org on
npm

## Component categories

When creating a new component you should specify the most suitable category in
the showcase file. The current categories are:

* <b>Primitive</b> - components that are the basic building blocks from which
  other components can be composed
* <b>Composed</b> - components that are composed of Primitives
* <b>Pages</b> - complex page level components made up from multiple Composed
  and Primitive components
* <b>Helpers</b> - tools, utilities and helpers

For example to add a `Slider` component to the the `Composed` category you just
prefix the category name in the `slider.showcase.js` file.

```
{
  name: "Composed/Slider",
  children: [
  ...showcases here
  ]
}
```

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a
fantastic help. They should remain focused in scope and avoid containing
unrelated commits. There should be a single PR for each component/package

Please **ask first** if somebody else is already working on this or the core
developers think your feature is in-scope. Generally always have a related issue
with discussions for whatever you are including.

## Testing

Every component should have a `XXXX.test.js` file with the component's Jest
tests split into the relevant platform folder e.g. `android`, `ios`, `web`.

If the component contains functionality that requires functional testing on a
device or browser, you can use [Fructose](https://github.com/newsuk/fructose).
This should follow the naming convention, `XXXX.fructose.js`.

Fructose also relies on an application existing within the project, in this case
we are using the storybook app. If you have not installed it, you can do so by
running `yarn ios`. You will need to terminate the server that is run with this
as fructose will run its own at the time of testing. As long as you do not
delete the app, you will only have to build the app once.

If you run `npm run functional-test:ios` in the root directory it will run
fructose tests for all of the components. This will similarly work for android
and web.

[Dextrose](https://github.com/newsuk/dextrose) is a visual snapshotting tool
designed to make the visual inspection of components easier.

In order to run dextrose simply use `yarn visual-snapshot-web`, `yarn
visual-snapshot-ios` or `yarn visual-snapshot-android`. Each component that has
differences from master will be visually snapshotted and saved under the
/dextrose/snappy folder. This can be very useful for visually validating
components.

## Local App Deployment

### Android

Follow these steps to deploy storybook native to a real android device.

* Plug the device into the computer
* Make sure your android device has trusted the connected computer and that `usb
  debugging / developer mode` has been turned on.
* For Android <4.2 go to Developer Options => Enable USB Debugging, and for
  Android >=4.2 go to About Phone/Tablet => Tap Build Number 7 Times =>
  Developer Options => Enable USB Debugging
* Install android tooling through `brew cask install android-platform-tools`
* Optionally start a local instance of
  [The Times Public Api](https://github.com/newsuk/times-public-api) (dependent
  on the stories you intend to view)
* Run `yarn`
* Run `yarn storybook-native`
* Run `yarn android:device` (to enable Times API)
* Open [storybook native](http:localhost:7007) on your computer and load a story

#### Troubleshooting

* If your device is complaining about about `story-loader.js` not existing - run
  `yarn storybook-native` before `yarn android`. This should generate the
  missing file.
* If your device is complaining about being unable to reach `localhost` or `404`
  use the `adb` commands. Shake the device to bring up the developer menu and
  reload the app
* If still struggling; shake the device and `debug js remotely`. Open a console
  on your computer for more info on the error
* If you're still struggling verify that you are able to run `yarn storybook`
  and that it works in web view.

### iOS

#### Building on Xcode 10

We are currently using React Native 0.55.4 which does not fully support Xcode
10<sup>[1](https://github.com/facebook/react-native/issues/14382#issuecomment-313163119),
[2](https://github.com/facebook/react-native/issues/19569#issuecomment-399652331)</sup>.
If you need to build with Xcode 10, you will need to run the below command,
**only after you have installed dependencies**.

```
$ yarn ios; pushd node_modules/react-native/third-party/glog-*; ../../scripts/ios-configure-glog.sh; popd; cp ios/build/Build/Products/Debug-iphonesimulator/libfishhook.a node_modules/react-native/Libraries/WebSocket/;
```

#### Other iOS Build Issues

If when trying to run `yarn ios` you receive a `":CFBundleIdentifier", Does Not
Exist` error, either on XCode 10 after attempting the above instructions, or on
a previous version of Xcode, try clearing your React Native cache with

```
rm -r ~/.rncache
```

and clearing third party libraries

```
rm -r node_modules/react-native/third_party
```

This happens when React Native caches third party tools for previous versions of
React Native.

If the above does not work, another approach is to change the XCode build system. Essentially you delete build artifacts by deleting the contents of your `Library/Developer/Xcode/DerivedData` folder.

Then choose the [legacy build system](facebook/react-native#19573). Then clean the XCode project (CMD-Shift-K) and build it again. This did result in a new directory being created but we have [.gitignored it for now](https://github.com/newsuk/times-components/pull/1381) (until RN fix their issues with XCode 10). 

### Font Naming Conventions

Android and iOS interpret fonts differently. The style property for `fontFamily`
on iOS refers to the internal post script name of the font. The style property
for `fontFamily` on Android refers to the filename of the font. React Native
Android only supports
[4 font weights](https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/views/text/ReactFontManager.java),
therefore we have made the following conventions

Also the fonts should have the correct `weight` and `style` meta attributes

## For all fonts which are; regular, bold, italic, bold and italic variants

### Filename format (physical file name): `<fontname>_<weight>` eg

* TimesDigitalW04.ttf
* TimesDigitalW04_italic.ttf
* TimesDigitalW04_bold.ttf

EXCEPT FOR REGULAR eg

TimesDigitalW04.ttf for a TimesDigitalW04-Regular.ttf font

### FontName format (meta of the font): `<fontname>-<weight>` eg

* TimesDigitalW04-Regular
* TimesDigitalW04-Italic
* TimesDigitalW04-Bold

### Family Name format (meta of the font): `<fontname>` eg

* TimesDigitalW04

## For fonts which have a font weight that is outside of the above font weights and styles

The filename, font name and family name should refer to the complete font file
name

* Filename format: `<fontname>-<weight>`
* Font Name / Full name format : `<fontname>-<weight>`
* Family Name format: `<fontname>-<weight>`

eg

* Filename = GillSansMTStd-Medium
* FontName / Full name = GillSansMTStd-Medium
* FamilyName = GillSansMTStd-Medium

## Folder Structure

An example component/package looks like this:

```
.
└── card
    ├── __tests__
    │   └── android
    │       └── __snapshots__
    │           └── card.android.test.js.snap
    │           └── card-with-style.android.test.js.snap
    │       └── card.android.test.js
    │       └── card-with-style.android.test.js
    │   └── ios
    │   └── web
    │   └── shared.test.js
    │   └── shared.native.js
    │   └── shared.web.js
    ├── src
    │   └── card.js
    ├── card.showcase.js
    ├── card.stories.js
    ├── CHANGELOG.md
    ├── package.json
    ├── README.md
    ├── rnw.js
    └── webpack.config.js
```

### Overview of project directory structure

* .storybook houses the web storybook config that dynamically loads the
  component stories and aliases the native imports to web
* .storybook.native is home to the generated `story-loader.js` from the
  `prestorybook-native` npm script, and the storybook bootstrapping
* android, ios, .babelrc, .buckconfig, .gitattributes, .watchmanconfig, app.json
  are all from a stock react-native project in order to run the native storybook
* lerna.json specifies that the packages are independent so different platforms
  can control which versions they consume and allows them to develop organically

## Setting Up a Local Copy

1. Clone the repo with `https://github.com/newsuk/times-components.git`

2. Run `yarn` in the root folder. Set a `GRAPHQL_ENDPOINT` envar for linting.

Once it is done, you can run `npm run storybook` and/or `npm run
storybook-native`

## Provider Queries package

The `Provider Queries package` is home to any GraphQL queries that should be
shared across the various platforms. The
[Times Public API](https://github.com/newsuk/times-public-api) schema is
generated in the `schema` package which should be updated when any fields are
changed. The packages linting will then check that each of the `gql` queries
within the package are properly formed

## Cutting a Release

Each component should be bumped and published correctly when it is merged to
master and has passed the CI process

_This was heavily sourced from
[CRA](https://github.com/facebookincubator/create-react-app/edit/master/CONTRIBUTING.md)_
