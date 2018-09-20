# Lazy Load

This is implemented with
[`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
and therefore is web only.

There are two props `rootMargin` and `threshold` which are as is in the docs
above. Be sure to set a sensible threshold otherwise you may not get the lazy
loading you were expecting. For example a threshold of 0 would mean no laziness.

When the component mounts it first tells the consumer that it should take any
appropriate client side measures such as measuring the width of things and using
them for any calculations they need to make.

When the consumer has registered DOM nodes with `LazyLoad` via the provided
`registerNode` callback, it will be re-rendered with a `Map` of the observed
nodes using the node's id as the `key` and the node itself as the `value`.

For browsers that don't support `IntersectionObserver`, `registerNode` will be
buffered and all nodes will be returned as "observed".

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
yarn test:web
```

Visit the official

[storybook](http://components.thetimes.co.uk?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Helpers%2FLazy%20load&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see it in action

## Future

`Lazy Load` could be a little more intelligent and only lazy load resources if
on a poor network connection perhaps with an option to `alwaysLazyLoad`.
