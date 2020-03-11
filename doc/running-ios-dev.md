# How to get TC running on IOS

## Prequisites
* clone https://github.com/newsuk/times-components
* clone https://github.com/newsuk/nuk-tnl-app-ios-universal/
* brew install cocoapods (https://brew.sh)

The directory structure should look like:
```
root
  | -> times-components
  | -> nuk-tnl-app-ios-universal
```

## Set up Times-Components
```
cd times-components
GRAPHQL_ENDPOINT="https://api.thetimes.co.uk/graphql" yarn
```

## Set up the IOS App
```
cd nuk-tnl-app-ios-universal
pod update
```

## Running them together with hot-reload
### In TimesComponents
```
yarn run ios:app
```
### In IOS App
```
open folder with xcode
press the play button in xcode to run the app
```

Once in the app, go to hardware->shake gesture and then press (configure bundler), use the following settings:
```
0.0.0.0
8081
ios-app/index.ios.js
```

Press reload.

Everything is now hooked up, you should see any changes you make in times components show up in the app automatically.
