# Tracking

Tracking is a collection of Higher-Order-Components (HOCs) that collects and
reports user defined events. All HOCs consumes a component and an object
describing how to create the analytics event.

The returned Component expects an analyticsStream to be available in context or
to be passed directly to the component via props. Every tracking HOC passses
it's analyticsStream to it's descendants via context.

## Testing Components with Tracking

The analyticsStream prop is expected to be a function that consumes an event
object.

To test whether your component propagates the correct events, pass `jest.fn()`
as the `analyticsStream` and test if your mock received the expected events.
Mind that you need to mock the `Date` and `setTimeout` to make your tests
reproducible.
