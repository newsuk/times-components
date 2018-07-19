# Test Utils

A suite of helper methods that assist with testing across all Times Components packages

## How to use

### iterator

The `iterator` method iterates over a given array of test objects and runs the tests after prefixing the test names with an index. This ensures a correct ordering of tests, particularly snapshot tests, which allows for a better code diff.

Example:

```
import { iterator } from "@times-components/test-utils";

const tests = [
  {
    name: "test one",
    test: () => {
      // do stuff with snapshots
    }
  },
  {
    name: "test two",
    test: () => {
      // do stuff with snapshots
    }
  }
];

iterator(tests);

Translates to:

it("1. test one", () => {
  // do stuff with snapshots
});

it("2. test two", () => {
  // do stuff with snapshots
});
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package
