# Android

## Setup

Firstly, add the following to your `build.gradle`, at the root level, in order to hook the Brightcove SDK into your project.

```
repositories {
    maven {
        url "http://repo.brightcove.com/releases"
    }
}
```

Then append this to your `dependencies`, in the same file:

```
compile project(path: ':rntbrightcovevideo')
```

Then open your `settings.gradle` and append the following to your `include` line

```
':rntbrightcovevideo'
```

It should then read something like this:

```
include ':app', ':rntbrightcovevideo'
```

Lastly, add this line to the file, taking care to point the _relative_ path to your `node_modules`,

```
project(':rntbrightcovevideo').projectDir = new File(settingsDir, '<path-to-node_modules>/@newsint/brightcove-video/android/rntbrightcovevideo')
```

## Implementation

In order to complete the implementation of the `brightcove-video` React component, you will need to register the package.

Firstly, add this to your imports in your `MainApplication.java`:

```
import uk.co.news.rntbrightcovevideo.BrightcovePackage;
```

And then add `new BrightcovePackage()` to your `getPackages` return as an additional parameter  function.

Once you have done this the function should read something like this:

```
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(), new BrightcovePackage()
    );
}
```
