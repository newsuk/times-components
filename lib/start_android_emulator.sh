#!/usr/bin/env bash
{
  EMULATOR=$(emulator -list-avds | head -n 1)

  if [[ -z $EMULATOR ]]
  then
    echo "You don't have an emulator set up"
    exit 0
  fi

  $ANDROID_HOME/tools/emulator @${EMULATOR} &

  bootanim=""
  failcounter=0
  timeout_in_sec=360

  until [[ "$bootanim" =~ "stopped" ]]; do
    bootanim=`adb -e shell getprop init.svc.bootanim 2>&1 &`
    if [[ "$bootanim" =~ "device not found" || "$bootanim" =~ "device offline"
      || "$bootanim" =~ "running" ]]; then
      let "failcounter += 1"
      echo "Waiting for emulator to start"
      if [[ $failcounter -gt timeout_in_sec ]]; then
        echo "Timeout ($timeout_in_sec seconds) reached; failed to start emulator"
        exit 1
      fi
    fi
    sleep 1
  done
}

echo "Emulator is ready"
exit 0
