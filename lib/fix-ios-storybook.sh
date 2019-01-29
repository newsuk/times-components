#!/bin/bash

# Fix for the missing 'config.h' file in the iOS Storybook app
# This is needed on the version 0.55.4 of React Native and can be removed once upgraded

./node_modules/react-native/scripts/ios-install-third-party.sh
pushd node_modules/react-native/third-party/glog-*
../../scripts/ios-configure-glog.sh
popd
cp ios/build/Build/Products/Debug-iphonesimulator/libfishhook.a node_modules/react-native/Libraries/WebSocket/;
