#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit 1
fi

script_home=$( dirname $(realpath "$0") )

cd $script_home
cd ..

for filename in ./systemd/*.service; do
    new_file=/lib/systemd/system/$(basename "$filename")
    cp $filename $new_file
    chown root.root $new_file
    chmod 644 $new_file
    sudo systemctl daemon-reload
    sudo systemctl disable $(basename "$filename")
    sudo systemctl stop $(basename "$filename")
    sudo systemctl enable $(basename "$filename")
    sudo systemctl start $(basename "$filename")
done