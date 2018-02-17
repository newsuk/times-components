# depend/cli

A tool for syncing version numbers in a monorepo.

# Usage

```
depend -e "packages/*/package.json" [...options]
```

# Options

## --fix

fixes the packages that are not in-sync

## --graph, -g ["{filter}"]

prints a graphviz compatible output that can be converted to a graphic

### Filter

The filter allows you to restrict the nodes that will be part of the graph.

The graph is described as a set of relationship of the shape `package@version =>
dependency@version`. A Node is included in the graph if the supplied pattern
matches the relationship. Currently only supported placeholder symbol is "\*".

#### Examples

`=>react-native@0.50.*`

everything that installs react-native ver0.50.\*

`=>jest`

everything that installs jest

`@times-components/*=>*`, `@times-components`

all the dependencies of all times-components packages

`*=>*` , ``, `*`

everything

## --bail

exit with code 1 if packages are not in-sync

## strategies [--strategy, -s]

Strategies decide which package version to use if more then one are used in the
monorepo.

### conservative

pick the oldest used version

### progressive

pick the newest used version

### majority

use the version the is used by the majority of packages in your repo

### majorityConservative

as majority but on a tie pick the older version

### majorityProgressive

as majority but on a tie pick the newer version

## Limitations

Version ranges are currently not supported.
