# Article Lead Asset

An article lead asset is an unstyled image or video (asset) with an inline
caption. The caption is rendered using the renderProps React convention. Consumers are
responsible for styling the lead asset by placing it inside of a container
and/or by styling the component returned by the caption renderProp.

## Usage

```js
// Image
<ArticleLeadAsset
    aspectRatio="16:9"
    displayImage={{
      ratio: "16:9"
      url: "http://crop169.io"
    }}
    leadAsset={{
      caption: "Caption text"
      credits: "Credits text"
      crop169: {
        ratio: "16:9"
        url: "http://crop169.io"
      }
    }}
    renderCaption={({ caption }) => <Caption {...caption } />}
    // Specify the width to render the asset at, this is used for lazy loading
    width={600}
/>
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

```
yarn test:web
```

Visit the official [storybook](https://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FArticle%20Lead%20Asset&selectedStory=Image&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)

<!-- Add the storybook link here. -->

## Future

<!-- Add details of future development here. -->
