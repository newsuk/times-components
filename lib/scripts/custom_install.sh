#!/usr/bin/env bash

{
  nmfetch -r $REMOTE_CACHE && yarn postinstall
} || {
  yarn
}
