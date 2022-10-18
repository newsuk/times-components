# UserState (Web Only)

Selectively render react components based on current user state.

Selectively rendering components based on the state the user is in
(subscriber, RA, RA Expired, Shared, Guest) is a common requirement across our
packages.

There is also currently some complexity with managing this as the server
and client sometimes disagree about what state a user is in. We handle this
internally, by using a technique known as
[two-pass rendering](https://reactjs.org/docs/react-dom.html#hydrate). **This
is an implementation detail, and this could change at any time.**

To deal with user states, we provide a reusable React component
which allows you to render some children if you're in a specified user state,
or a fallback if not.

You can use it as follows.

```js
import UserState from "@times-components/user-state";

<UserState
  state={UserState.subscriber}
  fallback={<div>Will only render for non-subscribers</div>}
  serverRender={
    /* Control whether you want this to render on the server at all */
  }
>
  // Anything you only want to render for subscribers
  <div>Will only render for subscribers</div>
</UserState>;
```

The `state` property is simply a matcher function that gets passed the current user
state and returns true/false to decide whether to return the children or
the fallback.

```js
// In the test file
import { mockUserState } from "@times-components/user-state";
const UserState = mockUserState();

UserState.mockStates = [
  // Any of the matcher functions you want to evaluate as true
  UserState.subscriber,
  UserState.shared
];

// Use UseState as usual in your production code
import UserState from "@times-components/user-state";

<UserState state={/*...*/}>// ...</UserState>;
```

## Storybook

The `UserState` package also provides a `addUserStateKnobs(defaultUserState)`
method which will automatically add user state knobs for stories that
selectively renders based on the user state. You just need to ensure that
`addUserStateKnobs` is called for every story.

```js
import { addUserStateKnobs, USER_STATES } from "@times-components/user-state";

storiesOf(...)
  .add(() => {
    addUserStateKnobs(USER_STATES.SUBSCRIBER);
  })
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

Testing can be done on each platform individually

```
yarn test:web
```

Visit the official

<!-- Add the storybook link here. -->

## Future

<!-- Add details of future development here. -->
