# Discord Bots

## Development Setup

1. Create a folder on your local machine to hold the repository then navigate to this folder in the terminal.
2. Clone the remote repository by running the command `git clone`.
3. Install the node dependancies by running `npm install` in the root of the repository.

## Raspberry Pi Setup

### Fresh Install

1. Flash a SD card with a fresh distro of Raspberry Pi OS Lite. In the rpi-imager, set the user as desired, remember what you set it as and make sure SSH is enabled by default.
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

3. Once the dependencies are installed for the system, clone this repository to the home directory of the user you setup.
4. Install the node dependencies by running `npm install` in the root of the repository.
5. Create `.env` file at root of repository containing:

```bash
BOT_TOKEN = <DISCORD BOT TOKEN>
```

Swap out `<DISCORD BOT TOKEN>` with token provided by discord.

## Add systemd service to service

To install all services, run this command: `sudo bash ./scripts/install-services.sh`. If you want to individually install use the following code block as a guide.

```bash
sudo cp ./systemd/discord-bot.service /lib/systemd/system/discord-bot.service
sudo chown root.root /lib/systemd/system/discord-bot.service
sudo chmod 644 /lib/systemd/system/discord-bot.service
sudo systemctl daemon-reload
sudo systemctl enable discord-bot.service
sudo systemctl start discord-bot.service
```

## Show service logs

```bash
sudo journalctl -u discord-bot -f
sudo journalctl -u discord-bot-update -f
```

## Setting up SSH connection in Visual Studio Code

1. Install the Remote-SSH extension by Microsoft from the extensions page
2. In the menu bar, got to View > Command Pallet and type Remote-SSH: Connect to Host and select that option
3. Click on Configure SSH Hosts and select C:\Users\'user'\ .ssh\config
4. Copy and past the code below

```bash
Host piserver
  HostName piserver
  User <USER>
```

Note: Make sure to change `<USER>` to the user you set when setting up the OS on the raspberry pi.

5. Repeat step 2
6. Select the option 'piserver'. A new Visual Studio Code window will open and prompt you for the password
7. Once connected, go to the Explorer tab on the left column and select open folder
8. Select 'discord-bot' and then click ok.

When connecting to the sever to make changes to the bot after you've followd the above steps, simply select discord-bot [SSH: piserver] from the Recent section of the Welcome page of Visual Studio Code

## Editing Bot Responses

All bot responses are stored in botResponses.json. If you need to add more information to an existing command, follow the style format already in place. Then commit changes to the gitub with a message about what you changed and the bot will automatically update once an hour with the changes. If you want to force the bot to update imediately, connect to the server via SSH and run the command `sudo systemctl restart discord-bot-update.service`.
