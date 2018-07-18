# Markup

This package is for core rendering of components such `paragraph`, `text` or
`link`. Consumers provide Abstrat Syntax Tree (AST) data which `markup` iterates
over and renders with default `renderer` functions that dictate how the nodes of
the AST are rendered. Consumers can override these default `renderers` by
providing their own.

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

The exported `renderTree` and `renderTrees` methods take AST data as the first
argument, and an optional overriding renderer object as the second argument. The
provided `renderer` methods should follow the pattern set out in the default
`renderers`. Each method should return an object with an `element` property (the
component to be rendered), and a optional `shouldRenderChildren` boolean that
can ensure the renderer does not render that node's children.

```js
import { renderTree } from "@times-components/markup";

const tree = {
  "name": "bold",
  "attributes": {},
  "children": [
    {
      "name": "text",
      "attributes": {
        "value": "I am bold"
      }
      "children": []
    }
  ]
}

// element is now
// <Text style={{fontWeight: bold}}>
//   I am bold
// </Text>
const element = renderTree(tree)
```

`renderTree` can also take an object of renderers to override or add to the
individual default renderers.

e.g

```js
import { renderTree } from "@times-components/markup";

const tree = {
  "name": "fancyThing",
  "attributes": {
    "backgroundColor": "red"
  },
  "children": [
    {
      "name": "text",
      "attributes": {
        "value": "I am fancy"
      }
      "children": []
    }
  ]
}

const renderers = {
  fancyThing(key, attributes, renderedChildren) {
    return {
      element: (
        <View key={key} style={{ backgroundColor: attributes.backgroundColor }}>
          <Text style={{ color: "green" }}>
            {renderedChildren}
          </Text>
        </View>
      )
    };
  }
}

// element is now
// <View style={{ backgroundColor: "red" }}>
//   <Text style={{ color: "green" }}>
//     I am fancy
//   </Text>
// </View>
const element = renderTree(tree, renderers)
```

`renderTrees` (note the plural) also exists as a connivence function to render
an array of trees into an array of react elements.

```js
import { renderTrees } from "@times-components/markup";

const trees = [
  {
    "name": "paragraph",
    "attributes": {},
    "children": [
      {
        "name": "text",
        "attributes": {
          "value": "I am one paragraph"
        }
        "children": []
      }
    ]
  },
  {
    "name": "paragraph",
    "attributes": {},
    "children": [
      {
        "name": "text",
        "attributes": {
          "value": "I am another paragraph"
        }
        "children": []
      }
    ]
  }
];


// element is now
// <View>
//   <Text key="1">I am one paragraph</Text>
//   <Text key="2">I am another paragraph</Text>
// </View>
const element = <View>{renderTrees(trees)}<View>
```
