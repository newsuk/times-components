# Storybook

Times Components showcases its UI components using
[storybook](https://github.com/storybooks/storybook):

> Storybook is a development environment for UI components. It allows you to
> browse a component library, view the different states of each component, and
> interactively develop and test components.

Each package has one or more `my-component.stories.js` file. The
`.(stories|stories.web).js` file name is the hook that the CLI uses to load
these stories into storybook.

## `my-component.stories.js`

```
import { showcaseConverter } from "@times-components/storybook";
import showcase from "./my-component.showcase";

showcaseConverter(module, showcase);
```

This package introduces the concepts of showcases, rather than stories.
Showcases provide a consistent and simple API for a developer to create stories.
The idea behind introducing the showcase concept was to help decouple Times
Components from storybook. Storybook version bumps in particular were playing
havoc with our CI, and managing these across `storybook`,
`storybook/addon-actions` and `storybook/addon-knobs` was becoming painful. Each
package has a `my-component.showcase.js` file which exports a showcase object.

## Showcase API

- name - a "/" delineated string describing the location of the showcase in the
  component library. Each "/" moves the showcase one level deeper in the
  component library tree
- children - an array of objects containing showcases

### Showcase Object

- type: string: story | decorator
- name: string
- platform: string: ios | android | native | web
- component: function: The method can take optional arguments `knobs` and
  `decorators`

## `my-component.showcase.js`

```
export default {
  name: "Primitives/MyComponent",
  children: [
    {
      type: "story",
      name: "The name of my showcase",
      platform: "native",
      component: (knobs, decorators) => (
        <MyComponent />
      )
    }
  ]
};
```

## Knobs

[`storybook/addon-knobs`](https://github.com/storybooks/storybook/tree/master/addons/knobs)
provides methods that allow users of the component library to amend `props`.
This reduces the number of stories, and introduces a level of interactivity that
allows users to fiddle with UI and test various aspects of components for
themselves.

NB: we provide a shim for the `select` knob, as it has crashed storybook.

## Decorators

The showcase package provides some custom
[decorators](https://storybook.js.org/addons/introduction/#1-decorators):

- CenteredDecorator - centres the wrapped component
- BarSpacingDecorator - provides some padding above the wrapped component
- LateralSpacingDecorator - provides some padding on the left and right of the
  wrapped component
- WhiteBgColorDecorator - puts the wrapped component on a white background for
  easier visual representation

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
