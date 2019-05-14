# MessageBar

A context to allow consumers to show a floating message over an article.

## Example Usage
```javascript
const TestConsumer = () => (
  <Context.Consumer>
    {({ showMessage }) => (
      <TouchableOpacity onPress={() => showMessage("foo")} />
    )}
  </Context.Consumer>
);

...

<MessageQueue animate delay={3000} scale={scales.medium}>
    <TestConsumer />
</MessageQueue>
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
yarn test:android
yarn test:ios
yarn test:web
```

Or the tests for all platforms can be run

```
yarn test:all
```

Visit the official
[Storybook](http://localhost:9001/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FMessageBar&selectedStory=MessageBar&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs)

<!-- Add the storybook link here. -->

## Future

<!-- Add details of future development here. -->
