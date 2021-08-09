# Topic

This topic package contains the data provider that fetches the articles for the
article list component to show articles associated with a particular topic. This
is distinct from the concept of a topic page in the pages package which contains
the data provider for the topic itself.

Topic makes use of the article list package which does most of the heavy lifting
in terms of pagination, error handling, layouts and lazy loading. This package
sets out what the article list page header should look like, and manages its own
tracking.

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
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-GraphQL%C2%A0Endpoint%20%28leave%C2%A0empty%C2%A0for%20mock%C2%A0data%29=&selectedKind=Pages%2FTopic&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available topic templates.

## Future

There is a consideration to move all providers to the provider package. This is
currently under advisement.

A lot of event handling is currently passed down through numerous components. We
intend to utilise the context package (using
[React Context API](https://reactjs.org/docs/context.html)) to manage these
events.
