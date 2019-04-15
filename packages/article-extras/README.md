# Article Extras

Article extras component to wrap components in the footer of the article page. This includes "Topics", "Related Articles" and "Article Comments". Any other component we want to lazy load on native apps can be added to this package.

On web, this component is populated by the props as its data is loaded together in the main article query.

On native, this component uses a provider and an "ArticleExtras" query to lazily load these components on page view.

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

http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FArticle%20Extras&selectedStory=Article%20Extras&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs
