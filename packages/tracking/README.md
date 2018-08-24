# Tracking

Tracking is a collection of Higher-Order-Components (HOCs) that extract and
report analytics of a component. All HOCs consume a component and an object
describing how to create the analytics event.

The returned component expects an `analyticsStream` to be available in React
context or to be passed directly to the component via props. Every tracking HOC
passes it's `analyticsStream` to it's descendants via React context.

n.b. while there is a "tracking context" that uses "React context", they are not
the same thing. The "tracking context" can be thought of as a "decoration
boundary" between logical business layers which are useful for reporting.

<pre>

How to implement tracking:

            +------------------------------------------+
            |                                          |
            |   Tracking context HOC                   |
            |                                          |
            |   +----------------------------------+   |
            |   |                                  |   |
            |   |   Tracking HOC - what events     |   |
            |   |                  should be sent? |   |
            |   |     +-------------------------+  |   |
            |   |     |  Component              |  |   |
            |   |     |                         |  |   |
            |   |     +-------------------------+  |   |
            |   |                                  |   |
            |   +----------------------------------+   |
            |                                          |
            +------------------------------------------+
            
Compose for this architecture:
                                   |
                                   |
                                   |
                                   v
+-------------------------------------------------------------------+
|                                                                   |
|   Last tracking context - send to a reporter (such as Tealium)    |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  |  Tracking context - edition information added               |  |
|  |                                                             |  |
|  |  +-------------------------------------------------------+  |  |
|  |  |                                                       |  |  |
|  |  |   Component - knows nothing about tracking which      |  |  |
|  |  |               is passed via context                   |  |  |
|  |  |      +------------------------------------------+     |  |  |
|  |  |      |  Tracking context - section information  |     |  |  |
|  |  |      |                     added                |     |  |  |
|  |  |      |    +---------------------------+         |     |  |  |
|  |  |      |    |                           |         |     |  |  |
|  |  |      |    |                           |         |     |  |  |
|  |  |      |    |  Component with           |         |     |  |  |
|  |  |      |    |  tracking HOC sends click |         |     |  |  |
|  |  |      |    |  events                   |         |     |  |  |
|  |  |      |    +---------------------------+         |     |  |  |
|  |  |      |                                          |     |  |  |
|  |  |      |                                          |     |  |  |
|  |  |      +------------------------------------------+     |  |  |
|  |  +-------------------------------------------------------+  |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+

</pre>

## Testing Components with Tracking

The `analyticsStream` prop is expected to be a function that consumes an event
object.

To test whether your component propagates the correct events, pass `jest.fn()`
as the `analyticsStream` and test if your mock received the expected events.
Mind that you need to mock the `Date` and `setTimeout` to make your tests
reproducible.

### Example

```js
  const events = jest.fn();
  renderer.create(<ComponentWithTracking analyticsStream={events} />);
  expect(events.mock.calls).toMatchObject(...);
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
yarn test:all
yarn test:android
yarn test:ios
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Helpers%2FTracking&selectedStory=Page%20tracking&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available tracking templates.
