#!/bin/bash

# Fix for the missing 'config.h' file in the iOS Storybook app
# The libfishhook.a library is not properly linked either
# This is needed on the version 0.55.4 of React Native and can be removed once upgraded

pushd node_modules/react-native/
./scripts/ios-install-third-party.sh
popd
pushd node_modules/react-native/third-party/glog-*
../../scripts/ios-configure-glog.sh
popd
cp ios/build/Build/Products/Debug-iphonesimulator/libfishhook.a node_modules/react-native/Libraries/WebSocket/ | true
