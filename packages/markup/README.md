# Markup

This package is for core rendering of components such as `paragraph`, `text` or
`link`. Consumers provide an Abstract Syntax Tree (AST) to the traversal
functions from `markup-forest`, which iterates over and renders with the given
`renderer` functions. This packages provides those core renderers.

## Renderers

* bold
* block
* break
* emphasis
* inline
* italic
* paragraph
* strong
* text

This package should only have core renderers with no dependencies beyond
React/React Native. If a consumer would like to support more complex elements
they'll need to provide renderers for them.

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

Testing can be done on each platform individually

```
yarn test:android
yarn test:ios
yarn test:web
```

Or the tests for all platforms can be run

```
yarn test:all
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FMarkup&selectedStory=Multiple%20paragraphs&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available markup templates.

## How to use

```js
import { renderTrees } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";

const data = [
  {
    name: "inline",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "Some text value here"
        },
        children: []
      }
    ]
  }
];

renderTrees(data, coreRenderers);

/*
native

<Text>
  Some text value here
</Text>

web

<span>
  Some text value here
</span>
*/
```
