## Raspberry Pi Setup

### Fresh Install
1. Flash a SD card with a fresh distro of Raspberry Pi OS Lite. In the rpi-imager, set the user to be `tt` and make sure SSH is enabled by default.
2. Once the Raspberry Pi boots, SSH into it and run the following commands from to install the dependencies:
```
# From the root of the repository run:
sudo apt-get update
sudo apt-get upgrade
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
```
3. Once the dependencies are installed for the system, clone this repository to the home directory of the `tt` user.
4. Install the node dependencies by running `npm install` in the root of the repository.

## Add systemd service to service
```
sudo cp ./systemd/ttdiscordbot.service /lib/systemd/system/ttdiscordbot.service
sudo chown root.root /lib/systemd/system/ttdiscordbot.service
sudo chmod 644 /lib/systemd/system/ttdiscordbot.service
sudo systemctl daemon-reload
sudo systemctl enable ttdiscordbot.service
sudo systemctl start ttdiscordbot.service
```

## Show service logs
```
sudo journalctl -u ttdiscordbot -f
```