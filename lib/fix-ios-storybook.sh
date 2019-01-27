#!/bin/bash

# Fix for the missing 'config.h' file in the iOS Storybook app
# This is needed on the version 0.55.4 of React Native and can be removed once upgraded

cd node_modules/react-native/third-party/glog-0.3.4
./configure
