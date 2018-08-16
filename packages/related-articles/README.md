# Related Articles

Related articles sit at the bottom of the article, providing similar articles
for a user to navigate to should they be interested. The related articles
component takes a

Slices are re-usable templates. A slice template lays itself out according to a
set of self-defined rules. The slice also provides a suggested default
configuration that can be applied to the given components that are to be laid
out within the template - this configuration is provided in the form of CSS
class names and JS objects for web, and a JS API for native. The consumer of
slice can opt-in or out of utilising these suggested default configurations

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
yarn test:all
yarn test:android
yarn test:ios
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Caption%3A%20=Judge%20Sapnara&knob-Caption%20Colour%3A%20=%23850029&knob-Content%3A%20=%5BThe%20judgement%20was%5D%20taken%20because%20of%20the%20evidence%20available%20in%20the%20court%20today%2C%20that%20the%20grandmother%20is%20an%20appropriate%20carer%20for%20the%20child&knob-Quote%20Colour%3A%20=%23850029&knob-Twitter%20Link%3A%20=%40henrywinter&selectedKind=Composed%2FRelatedArticles&selectedStory=Standard%20template%20with%20one%20related%20article&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available related articles templates.

## Future

Template creation could be done using a CLI to create default files in the
accepted architectural format
