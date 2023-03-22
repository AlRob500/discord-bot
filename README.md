# Theta Tau Discord Bots

## Development Setup
TODO
## Raspberry Pi Setup

### Fresh Install
1. Flash a SD card with a fresh distro of Raspberry Pi OS Lite. In the rpi-imager, set the user to be `tt` and make sure SSH is enabled by default.
2. Once the Raspberry Pi boots, SSH into it and run the following commands from to install the dependencies:
```bash
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
5. Create `.env` file at root of repository containing: 
```bash
TTBASED_TOKEN = <DISCORD BOT TOKEN>
```
Swap out `<DISCORD BOT TOKEN>` with token provided by discord.

## Add systemd service to service
To install all services, run this command: `sudo bash ./scripts/install-services.sh`. If you want to individually install use the following code block as a guide.
```bash
sudo cp ./systemd/tt-discord-bot.service /lib/systemd/system/tt-discord-bot.service
sudo chown root.root /lib/systemd/system/tt-discord-bot.service
sudo chmod 644 /lib/systemd/system/tt-discord-bot.service
sudo systemctl daemon-reload
sudo systemctl enable tt-discord-bot.service
sudo systemctl start tt-discord-bot.service
```

## Show service logs
```bash
sudo journalctl -u tt-discord-bot -f
sudo journalctl -u tt-discord-bot-update -f
```

## Setting up SSH connection in Visual Studio Code

1. Install the Remote-SSH extension by Microsoft from the extensions page
2. In the menu bar, got to View > Command Pallet and type Remote-SSH: Connect to Host and select that option
3. Click on Configure SSH Hosts and select C:\Users\'user'\ .ssh\config
4. Copy and past the code below

```bash
Host ttpiserver
  HostName ttpiserver
  User tt
```

5. Repeat step 2 
6. Select the option 'ttpiserver'. A new Visual Studio Code window will open and prompt you for the password
7. Once connected, go to the Explorer tab on the left column and select open folder
8. Select 'tt-discord-bot' and then click ok. 

When connecting to the sever to make changes to the bot after you've followd the above steps, simply select tt-discord-bot [SSH: ttpiserver] from the Recent section of the Welcome page of Visual Studio Code

## Editing Bot Responses
All bot responses are stored in botResponses.json. If you need to add more information to an existing command, follow the style format already in place. Then commit changes to the gitub with a message about what you changed