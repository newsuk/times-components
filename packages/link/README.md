Link Component
==============

This component wraps its children to make them clickable and turn them into hyperlinks for web.

How to use
----------

```js
import Link, { TextLink } from "@times-components/link";

// works with block elements
<Link url="https://thetimes.co.uk" onPress={doSomeNavigation(url)}>
  <View style={{ width: 100, height: 100, backgroundColor: "pink" }} />
</Link>

// and also with inline text
<TextLink url="https://thetimes.co.uk/" onPress={doSomeNavigation(url)}>
  The Times
</TextLink>
```

Typically, apps will need to use the `onPress` callback to bubble up navigation so that the parent native Activity or UIViewContoller can handle the navigation, rather than multiple Activities or UIViewContollers mistakingly navigating multiple times in native land.
