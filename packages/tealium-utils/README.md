# Tealium Utils

This package simply sets up a "dev" instance of the Tealium reporter
for usage in the Times Components showcases. Showcases typically import this
method and pass it to any component that utilises the tracking package.

```
import storybookReporter from "@times-components/tealium-utils";

...
<MyTrackedComponent analyticsStream={storybookReporter} />
```

Events can be tested and validated in the showcases by clicking on the "Action
Logger" tab at the bottom of the showcase. This utilises
[@storybook/addon-actions](https://github.com/storybooks/storybook/tree/master/addons/actions).

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
