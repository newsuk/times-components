#!/usr/bin/env bash
{
  adb_cmd="$ANDROID_HOME/platform-tools/adb"
  device=$($adb_cmd devices | tail -n +2)
  if [[ ! -z $device ]]
  then
    echo "Device is already running"
    exit 0
  fi

  emulator_cmd="$ANDROID_HOME/tools/emulator"

  avd=$($emulator_cmd -list-avds | head -n 1)

  if [[ -z $avd ]]
  then
    echo "You don't have an emulator set up"
    exit 1
  fi

  $emulator_cmd @${avd} &

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
