# Save and Share bar

Save and Share bar component

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## How to use

```js
import SaveAndShareBar from "@times-components/save-and-share-bar";

<SaveAndShareBar
  articleUrl={articleId}
  onCopyLink={this.copyLinkToClipboard}
  onSaveToMyArticles={this.saveToMyArticles}
/>;
```

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

Or the tests for all platforms can be run

```
yarn test:all
```

Visit the official
[storybook](http://components.thetimes.co.uk)
to see our available link templates.

## Future

The bar should be extended with custom onPress logic and user info state
