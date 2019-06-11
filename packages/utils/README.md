# Utils

This package contains shared utilities for other packages, such as UserState, string utils,
screen size utils, and schema updater.

## Fetching the latest schema

In order to fetch the latest graphql schema, follow these steps:

1. `export GRAPHQL_ENDPOINT=https://api.thetimes.co.uk/graphql` (Omit this step
   to use local server instead)
2. `yarn make-schema`

## User State

Selectively rendering components based on the state the user is in
(subscriber, RA, RA Expired, Shared, Guest) is a common requirement across our
packages. There is also currently so complexity with managing this as the server
and client sometimes disagree about what state a user is in.

To handle this, we provide a **WEB ONLY** reusable React component which allows you to
render some children if you're in a specified user state, or a fallback if not.

You can use it as follows.

```js
import { UserState } from "@times-components/utils";

<UserState
    state={UserState.subscriber}
    fallback={<div>Will only render for non-subscribers</div>}
    serverRender={/* Control whether you want this to render on the server at all */}
>
    // Anything you only want to render for subscribers
    <div>Will only render for subscribers</div>
</UserState>
```

The `state` property is simply a matcher function that gets passed the current user
state and returns true/false to decide whether to return the children or
the fallback.

`UserState` also provides a number of preset matchers which you can use.

- `loggedIn`: Is the user logged in at all (subscriber, RA, RA Expired)
- `meteredExpired`: Is the user RA Expired
- `metered`: Is the user RA or RA Expired
- `shared`: Is the user viewing with a shareToken
- `nonExpiredUser`: Is the user logged in with access (subscriber, RA)
- `fullArticle`: Does the user have access to the full article (subscriber, RA, share token)
- `subscriber`: Is the user a subscriber
- `loggedInOrShared`: Is the user logged in or on a share token (subscriber, RA, RA Expired, share token)

There is a companion tool inside the `@times-components/mocks` for mocking
the `UserState` package and rendering with a specific user state.

```js
// In the test file
import { mockUserState } from "@times-components/mocks";
const UserState = mockUserState();

UserState.mockStates = [
  // Any of the matcher functions you want to evaluate as true
  UserState.subscriber,
  UserState.shared
];

// Use UseState as usual in your production code
import { UserState } from "@times-components/utils";

<UserState state={/*...*/}>
  // ...
</UserState>
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
yarn test
```

## Future

Some of the test specific utilities should be moved to the test-utils package.
