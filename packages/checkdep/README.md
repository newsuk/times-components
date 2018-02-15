# checkdep/cli

A tool for syncing version numbers in a monorepo.

## --fix

fixes the packages that are not in-sync

## --bail

exit with code 1 if packages are not in-sync

## strategies

Strategies decide which package version to use if more then one are used in the monorepo.

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


```
checkdep -e "packages/*/package.json" [...options]

Options:
  --strategy, -s  {conservative|progressive|majority|majorityConservative|majorityProgressive}
  --expr, -e                                                                                    [default: "packages/*/package.json"]
  --list                                                                                        [default: false]
  --fix                                                                                         [default: false]
  --bail                                                                                        [default: false]
  --hint                                                                                        [default: false]
  --showRules                                                                                   [default: false]
```
