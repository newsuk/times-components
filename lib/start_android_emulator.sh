#!/usr/bin/env bash

EMULATOR=$(emulator -list-avds | head -n 1)

if [[ -z $EMULATOR ]]
then
  echo "You don't have an emulator set up"
  exit 0
fi

$ANDROID_HOME/tools/emulator @${EMULATOR}

exit 0
