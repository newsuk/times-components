# Link

The link component wraps its children and makes them clickable elements. There are two exported components:

- `Link` - wraps any element, effectively making it clickable
- `TextLink` - makes any inline text a link

## How to use

```js
import Link, { TextLink } from "@times-components/link";

// works with block elements
<Link url="https://thetimes.co.uk" onPress={doSomeNavigation(url)}>
  <View style={{ width: 100, height: 100, backgroundColor: "pink" }} />
</Link>

// and also with inline text
<TextLink url="https://thetimes.co.uk/" onPress={doSomeNavigation(url)}>
  The Times
</TextLink>
```

The link accepts a `responsiveLinkStyles` prop that allows
the resulting `<a>` tag to be styled responsively.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## Running the code

Please see our main [README.md](../README.md) to get the project running locally

## Development

The code can be formatted and linted in accordance with the agreed standards.

```
yarn fmt
yarn lint
```

## Testing

This package uses [yarn](https://yarnpkg.com) (latest) to run unit tests on each
platform with [jest](https://facebook.github.io/jest/).

```
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FLink&selectedStory=Link%20with%20big%20content&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available link templates.
