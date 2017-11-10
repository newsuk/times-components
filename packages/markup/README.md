# Markup Component

This component renders out markup trees into react components.

## How to use

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
    return (
      <View key={key} style={{ backgroundColor: attributes.backgroundColor }}>
        <Text style={{ color: "green" }}>
          {renderedChildren}
        </Text>
      </View>
    );
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
import { renderTree } from "@times-components/markup";

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
