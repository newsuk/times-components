# Related Articles

Related articles sit at the bottom of the article, providing similar articles
for a user to navigate to should they be interested. The related articles
component uses three templates which are configured within the
[slice package](https://github.com/newsuk/times-components/tree/master/packages/slice):

- `StandardSlice`
- `LeadAndTwoSlice`
- `OpinionAndTwoSlice`

## Standard template

This is the simplest template called `StandardSlice`, whereby all of the
returned related articles (`items`) are of equal importance, and come
pre-ordered (or sorted) from the API.

## Lead and Opinion templates

The `LeadAndTwoSlice` and `OpinionAndTwoSlice` templates each have a "main"
article, and two "supporting" articles (`support1` and `support2`). This package
takes the "main" (either `lead` or `opinion`, depending on the template)
article, and passes that as part of a render prop to the slice package. A
separate render prop handles the "supporting" articles (as an array). Each
article is iterated over and rendered as appropriate.

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
