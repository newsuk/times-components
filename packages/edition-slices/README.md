# EditionSlices

This package contains the components required by the edition pages, such as "Tiles" and "Slices".

Tiles are the rectangular tiles that's used inside slices. Each tile corresponds to a single article.

Slices contain multiple tiles and lays them out differently depending on the platform and breakpoints.

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

http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FEdition%2FSlices&selectedStory=Lead%20One%20Full%20Width&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs
