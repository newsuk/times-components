# jest-serializer

A suite of tools to enable you to "curate" the "perfect" Jest snapshot. See
[this blog post](https://medium.com/@craigbilner/expect-anything-tomatchsnapshot-here-be-dragons-26516e02de8c)
for more details on why this package was developed. The primary focus is on JSX
in snapshots rather than other data structures.

It's designed to aid you with your tests that use Jest with no other
requirements \* other than importing the desired serializers for your needs.

\* there's currently a dependency on `react-native-web` that needs removal.

### Supported

- Jest@21.2.1
- Node@8.11.3

## Getting started

```
yarn add @times-components/jest-serializer --dev
```

within your tests you can now use code that looks like this:

```javascript
import {
  addSerializers,
  enzymeRenderedSerializer,
  minimalNative
} from "@times-components/jest-serializer";

addSerializers(expect, enzymeRenderedSerializer(), minimalNative);
```

and any snapshot tests that run in the context of this serializer will generate
snapshots based on these
[custom serializers](http://jestjs.io/docs/en/configuration.html#snapshotserializers-array-string).
The context being the "test file" currently under test.

## Serializers

**addSerializers(expect: JestExpect, ...serializers: Serializer[]): void**

Implicitly add your custom Jest serializer(s) by using `addSerializers`. This
takes Jest's global `expect` followed by any serializers you would like to use
e.g.

```javascript
addSerializers(expect, serializer1, serializer2);
```

These are the serializers that are currently provided:

### compose

**compose(printer: Printer, ...transformers: Transformer[]): Serializer**

A special type of serializer that takes a `printer` followed by the transformers
you would like to apply.

A transformer is any of the serializers below but with "Transform" appended.
This allows us to only visit each node once and perform each transformation
(from left to right) on it. Accordingly, order is important for transformers
that have side-effects that another transformer was relying on e.g.

```javascript
import { AppRegistry } from "react-native-web";

compose(
  stylePrinter,
  minimalWebTransform,
  rnwTransform(AppRegistry, ["color"])
);
```

is the same as running the `minimalWeb` and `rnw` serializers together, and if
`rnw` had a dependency on what `minimalWeb` was removing, you would need to swap
them round.

### Enzyme Serializers

When using enzyme in conjunction with
[enzyme-to-json](https://github.com/adriantoine/enzyme-to-json) you can use
[mount](https://github.com/airbnb/enzyme#full-dom-rendering) to give you access
to
[these modes](https://github.com/adriantoine/enzyme-to-json/blob/master/docs/modes.md).
They've been wrapped in the serializers below for convenience and clarity

#### enzymeRenderedSerializer

**enzymeRenderedSerializer(): Serializer**

Gives you your mounted Enzyme component tree as if it was rendered. i.e.
`<div>`s and `<span>`s. This useful if you don't care to manipulate the tree in
anyway.

#### enzymeRootSerializer

**enzymeRootSerializer(): Serializer**

While you may have mounted the component you can still ask to just serialize the
root component only. May be useful if you have a mixture of snapshot
requirements involving both parent and children. However you may use Enzyme's
own API to pick the correct thing to snapshot to begin with.

#### enzymeTreeSerializer

**enzymeTreeSerializer(): Serializer**

The majority of the time you may be using the rendered version but this one
allows you to see the "host" components and therefore allow you to refine the
snapshot in various ways based on them. Can be used in conjunction with the
`replace` serializer to keep the snapshots focused.

e.g.

```jsx harmony
<ParentComponent>
  <div>
    <ChildComponent>
      <span>Hello world!</span>
    </ChildComponent>
  </div>
</ParentComponent>
```

### flattenStyle

**flattenStyle: Serializer**

If you're using Enzyme you may find that styles (depending on how they've been
written) may appear as a number (a pointer to a RN stylesheet style) or an Array
(a composition of styles). This squashes it all for you, and allows you to see
the styles as intended.

On web you may want to also use `hoistStyle` to clean up the snapshot noise
further.

### hoistStyle

**hoistStyle: Serializer**

While on Native it may make sense to show a snapshot with inline styles on web,
it's perhaps a little more idiomatic to see it as a `className` and the style to
reside in a `style` block. This is a better reflection of how it'll be rendered
on the platform (RNW magic) and keeps the snapshots a little leaner too.

For the styles to be shown, use with `compose` and the `stylePrinter`.

### minimalise

**minimalise((value: Object, key: string): boolean): Serializer**

Takes a function that allows you to omit certain properties that you're not
interested in seeing. Often snapshots will spew out many `props` that are
irrelevant to your tests (especially on RN), this serializer is a key tool in
keeping them focused e.g.

```javascript
addSerializers(expect, minimalise((value, key) => key === "style"));
```

will strip all styles from your JSX nodes.

### minimalNative

**minimalNative: Serializer**

A convenience serializer to remove the plethora of `prop`s RN prints by default
that may change between RN version but have no baring on your tests. In
particular it removes `[Function]` values because they should be tested with
either interactive tests and/or a type system rather than with snapshots.

Refer to the code for the latest removed values.

### minimalRnw

**minimalRnw(AppRegistry): Serializer**

An example of perhaps where this package is likely to move to as patterns and
common use cases appear. This combines `minimalWeb` with `rnw` much like a babel
preset.

### minimalWeb

**minimalWeb: Serializer**

A convenience serializer to remove the plethora of `prop`s React prints by
default that may change between React and/or react-native-web versions but have
no baring on your tests. In particular it removes `[Function]` values because
they should be tested with either interactive tests and/or a type system rather
than with snapshots.

Refer to the code for the latest removed values.

### replace

**type Replacer = (node: ReactNode, props: ReactProps, children: ReactChildren):
{ node?: ReactNode, props?: ReactProps, children?: ReactChildren };**

**replace({ [ComponentName: string]: Replacer }): Serializer**

A serializer that may be best suited to `jest.mock` but in some cases you may
find it desirable to simply switch out bits of your tree for brevity and focus
independent of what `jest.mock` provides or because you don't want to globally
mock the dependency. `jest-mock` also doesn't play well with web or named member
imports.

### replaceProp

**replaceProp((value: Object, key: string): Object): Serializer**

Similar to the `minimalise` serializer, rather than omitting values you can
replace them. This is handy for occasions when a prop value has a very long
completely unreadable value that you would like to "monitor" and see on a PR
that a change has been made but at the same time not destroy the snapshots
readability.

### rnw

**rnw(AppRegistry, string[]): Serializer**

If you're using [react-native-web](https://github.com/necolas/react-native-web)
and Jest snapshots on the web platform to ensure your components are rendering
the expected web output, there'll be a lot of `className` noise.

Use this serializer with any style properties you're interested in, and when
`compose`d with the `stylePrinter` you can see these printed in a `style` block
e.g.

```javascript
import { AppRegistry } from "react-native-web";

compose(
  stylePrinter,
  rnwTransform(AppRegistry, ["color", "fontSize"])
);
```

will assign a generic `className` to the Node and print the styles with that
`className`, but only for `color` and `fontSize` due to RNW producing many stock
styles.

`AppRegistry` needs to come from the consumer where the styles have been cached.

## Printers

Currently there are two types of "printers". A printer has the type:

**(serialize: ((obj: Object): string), accum: {[key: string]: string}, element:
ReactNode): string**

The custom serializers can build up something they'd like to "accumulate" over
the whole snapshot such as styles, and the printer decides how to print them.

### print

Simply takes the given `Node` and uses Jest's standard `serialize` method;

### stylePrinter

A custom printer that works with `hoistStyle` and `rnw` which takes their
accumulated "bag" of styles and prints them in a `style` block

## Patterns and Practices

As discussed in the blog post at the start of the document, there are currently
numerous problems around "building trees" of React components and rendering them
out nicely on both Native and Web platforms. Enzyme doesn't have the React
Native adapter so using React Test Renderer tends to be your best bet. This
doesn't give you "host" objects for the `replace` serializer leaving you with
`jest.mock`. It's currently advisable to mock all your dependencies even if you
have the best intentions with "integration" testing. They usually lead to a
multitude of snapshot updates you don't care about which dulls your interest in
reviewing them at the PR level with little benefit.

For web using Enzyme with `mount` and a mixture of the
`enzymeRenderedSerializer` and `enzymeTreeSerializer` should give you everything
you need to start with. As with the curation of any snapshot, it's best to start
with the raw output, then prune it iteratively to make sure you both don't miss
something and/or can make informed decision on where you want to split your
snapshots.

It's particularly recommended to split out styling from rendering in tests due
to the same "too many updates" problem. It's much more likely that the snapshots
will be valued if they only update when they're supposed to and changing
`padding` shouldn't change the snapshot test for "renders capital letters". It
also highlights on a PR when a styling change is made and the style snapshot _is
not_ updated to the reviewer. This would indicate it's not being correctly
captured which can get lost with large "big picture" renders.

Another pattern you want to look out for is repeated props throughout a snapshot
which probably means they should be removed and one test should represent them.
It's discretionary but probably means the snapshots aren't focused on the tests
enough.

On Native you're likely going to want to use `minimalNative`, `flattenStyle` and
`minimalise` to focus the given tests.

On web you're similarly going to be looking at `minimalWeb`, `hoistStyle`,
`minimalise`, and `rnw`.

BE AWARE! Under the hood of `addSerializer` it's using
`expect.addSnapshotSerializer`. There's no `expect.removeSnapshotSerializer` and
they don't compose particularly well due to the various side-effects after
they've been applied. While it is possible to get a coincidental balance of
serializers at the test level (order very much dependent), try and run your
desired serializers per test file for sanity.
