# Tealium

Times Components uses
[Tealium iQ Tag Management](https://tealium.com/products/tealium-iq-tag-management-system/)
to track important visitor activity.

> Tag Management is a system for managing the configuration, testing, and
> release of third-party vendor tags to a digital property. This approach
> replaces the hard-coded tags on your site with a single container tag. Once
> this tag is in place you have full control over adding, removing, and updating
> the tags on your site directly from the iQ Tag Management interface.

You can find a good overview of tag management and how it works
[on the Tealium website](https://community.tealiumiq.com/t5/iQ-Tag-Management/Tag-Management-Concepts/ta-p/15883).

Tracking is our generic way of bubbling up events, and we only use Tealium to pass these events
to the backend.

This package provides a Class Constructor called `TealiumSendScheduler` that is
configured with some Tealium properties, and takes the global `window` and
`document` objects as its other arguments. `TealiumSendScheduler` appends the
required Tealium JavaScript to the page (`utag.js`).

```
import tealiumReporter, {
  TealiumSendScheduler
} from "@times-components/tealium";

const trackingOptions = {
  account: "my-account-name",
  enabled: true, // (optional) default is true
  env: "my-env-name",
  profile: "my-profile-name"
};

const tealiumSendScheduler = new TealiumSendScheduler(
  trackingOptions,
  global.window,
  global.document
);

const reporter = tealiumReporter(tealiumSendScheduler);
```

The default export (`tealiumReporter`) of this package provides an API that
allows consumers to call an `analytics` method with an event. This event will be
queued up and reported to Tealium asynchronously.

```
reporter.analytics(myEvent);
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

This package uses [yarn](https://yarnpkg.com) (latest) to run unit tests on each
platform with [jest](https://facebook.github.io/jest/).

```
yarn test:web
```

## Future

A little refactoring around how `window` and `document` are passed through.
`document` can be derived from `window`.
