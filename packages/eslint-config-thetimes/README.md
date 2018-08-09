# Eslint Config

This package contains the eslint configuration for Times Components (TC). New TC
packages created with the CLI will automatically add a pointer to this package
in their `.eslintrc.json` files.

```
{
  "extends": ["@times-components/thetimes"]
}
```

As a rule, we should only abide by `prettier` and `Airbnb` but in extenuating
circumstances rules can be overriden here should they not make sense for the
project.

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
