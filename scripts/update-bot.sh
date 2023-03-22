#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit 1
fi

script_home=$( dirname $(realpath "$0") )

cd $script_home
cd ..
UPSTREAM=${1:-'@{u}'}
LOCAL=$(sudo -H -u tt bash -c "git rev-parse @")
REMOTE=$(sudo -H -u tt bash -c "git rev-parse $UPSTREAM")
BASE=$(sudo -H -u tt bash -c "git merge-base @ $UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date, nothing to do..."
elif [ $LOCAL = $BASE ]; then
    echo "Need to pull, updating..."
    sudo -H -u tt bash -c "git fetch"
    sudo -H -u tt bash -c "git pull"
    sudo bash ./scripts/install-services.sh 
elif [ $REMOTE = $BASE ]; then
    echo "Need to push, skipping..."
else
    echo "Diverged, needs manual intervention..."
fi

