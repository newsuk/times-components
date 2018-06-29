#jest-serializer

A suite of tools to enable you to "curate" the "perfect" Jest snapshot. See
[this blog post](https://medium.com/@craigbilner/expect-anything-tomatchsnapshot-here-be-dragons-26516e02de8c)
for more details on why this package was developed. The primary focus is on JSX
in snapshots rather than other data structures.

It's designed to aid you with your tests that use Jest with no other
requirements \* other than importing the desired serializers for your needs.

\* there's currently a dependency on `react-native-web` that needs removal.

### Supported

* Jest@21.2.1
* Node@8.11.3

##Getting started

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

##Serializers

**addSerializers(expect: JestExpect, ...serializers: Serializer[]): void**

Implicitly add your custom Jest serializer(s) by using `addSerializers`. This
takes Jest's global `expect` followed by any serializers you would like to use
e.g.

```javascript
addSerializers(expect, serializer1, serializer2);
```

These are the serializers that are currently provided:

###compose

**compose(printer: Printer, ...transformers: Transformer[]): Serializer**

A special type of serializer that takes a `printer` followed by the transformers
you would like to apply.

A transformer is any of the serializers below but with "Transform" appended.
This allows us to only visit each node once and perform each transformation
(from left to right) on it. Accordingly, order is important for transformers
that have side-effects that another transformer was relying on e.g.

```javascript
compose(stylePrinter, minimalWebTransform, rnwTransform(["color"]));
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

####enzymeRootSerializer

**enzymeRootSerializer(): Serializer**

While you may have mounted the component you can still ask to just serialize the
root component only. May be useful if you have a mixture of snapshot
requirements involving both parent and children. However you may use Enzyme's
own API to pick the correct thing to snapshot to begin with.

####enzymeTreeSerializer

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

###flattenStyle

**flattenStyle: Serializer**

If you're using Enzyme you may find that styles (depending on how they've been
written) may appear as a number (a pointer to a RN stylesheet style) or an Array
(a composition of styles). This squashes it all for you, and allows you to see
the styles as intended.

On web you may want to also use `hoistStyle` to clean up the snapshot noise
further.

###hoistStyle

**hoistStyle: Serializer**

While on Native it may make sense to show a snapshot with inline styles on web,
it's perhaps a little more idiomatic to see it as a `className` and the style to
reside in a `style` block. This is a better reflection of how it'll be rendered
on the platform (RNW magic) and keeps the snapshots a little leaner too.

For the styles to be shown, use with `compose` and the `stylePrinter`.

###minimalise

**minimalise((value: Object, key: string): boolean): Serializer**

Takes a function that allows you to omit certain properties that you're not
interested in seeing. Often snapshots will spew out many `props` that are
irrelevant to your tests (especially on RN), this serializer is a key tool in
keeping them focused e.g.

```javascript
addSerializers(expect, minimalise((value, key) => key === "style"));
```

will strip all styles from your JSX nodes.

###minimalNative

**minimalNative: Serializer**

A convenience serializer to remove the plethora of `prop`s RN prints by default
that may change between RN version but have no baring on your tests. In
particular it removes `[Function]` values because they should be tested with
either interactive tests and/or a type system rather than with snapshots.

Refer to the code for the latest removed values.

###minimalRnw

**minimalRnw: Serializer**

An example of perhaps where this package is likely to move to as patterns and
common use cases appear. This combines `minimalWeb` with `rnw` much like a babel
preset.

###minimalWeb

**minimalWeb: Serializer**

A convenience serializer to remove the plethora of `prop`s React prints by
default that may change between React and/or react-native-web versions but have
no baring on your tests. In particular it removes `[Function]` values because
they should be tested with either interactive tests and/or a type system rather
than with snapshots.

Refer to the code for the latest removed values.

###replace

**type Replacer = (node: ReactNode, props: ReactProps, children: ReactChildren):
{ node?: ReactNode, props?: ReactProps, children?: ReactChildren };**

**replace({ [ComponentName: string]: Replacer }): Serializer**

An experimental serializer that may be best suited to `jest.mock` but in some
cases you may find it desirable to simply switch out bits of your tree for
brevity and focus independent of what `jest.mock` provides or because you don't
want to globally mock the dependency.

###rnw

**rnw(string[]): Serializer**

If you're using [react-native-web](https://github.com/necolas/react-native-web)
and Jest snapshots on the web platform to ensure your components are rendering
the expected web output, there'll be a lot of `className` noise.

Use this serializer with any style properties you're interested in, and when
`compose`d with the `stylePrinter` you can see these printed in a `style` block
e.g.

```javascript
compose(stylePrinter, rnwTransform(["color", "fontSize"]));
```

will assign a generic `className` to the Node and print the styles with that
`className`, but only for `color` and `fontSize` due to RNW producing many stock
styles.

##Printers

Currently there are two types of "printers". A printer has the type:

**(serialize: ((obj: Object): string), accum: {[key: string]: string}, element:
ReactNode): string**

The custom serializers can build up something they'd like to "accumulate" over
the whole snapshot such as styles, and the printer decides how to print them.

###print

Simply takes the given `Node` and uses Jest's standard `serialize` method;

###stylePrinter

A custom printer that works with `hoistStyle` and `rnw` which takes their
accumulated "bag" of styles and prints them in a `style` block
