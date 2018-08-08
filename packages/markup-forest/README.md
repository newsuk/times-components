# Markup Forest

The exported `renderTree` and `renderTrees` methods take AST data as the first
argument, and a renderer object as the second argument. Each renderer should
return an object with an `element` property (the component to be rendered), and
an optional `shouldRenderChildren` boolean that can ensure the renderer does not
render that node's children.

`renderTrees` is used typically because an AST is a list of trees, however
`renderTree` can be used if it's known that it is a single tree being traversed.

For most usages you will want to use the
[markup](https://github.com/newsuk/times-components/tree/master/packages/markup)
package which provides renderers out of the box for all simple elements. These
functions will only render elements which have a renderer with no fallback.

## How to use

### renderTrees

```js
import { renderTrees } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";

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
const element = <View>{renderTrees(trees, coreRenderers)}<View>
```

### renderTree

```js
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";

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
const element = renderTree(tree, coreRenderers)
```

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
yarn test
```
