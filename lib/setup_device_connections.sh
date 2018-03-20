#!/bin/bash

if ! adb devices -l | grep 'usb\|emulator' > /dev/null
then
  echo "No devices connected"
  exit 1
fi

echo "Setting up socket connections..."

echo "...local Times API"
adb reverse tcp:4000 tcp:4000

echo "...Storybook Native"
adb reverse tcp:7007 tcp:7007

echo "...enabling live reloading"
adb reverse tcp:8081 tcp:8081
