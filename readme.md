# N Square Media Bot 🤖

N Square Media Bot is a Telegram bot designed to help you manage and optimize your media files efficiently. With features like video compression, image compression, video to MP3 conversion, and video trimming, this bot makes handling media files a breeze.

## Getting Started

To get started with N Square Media Bot 🤖, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nsquare-media-bot.git
cd nsquare-media-bot
```
### 2. Install Dependencies
```
npm install
```
### 3. Set up Environment Variables
Create a .env file in the root directory of the project and provide the following environment variables:

```
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
FFMPEG_FLV_TOOL_PATH=/path/to/flvtool2
FFMPEG_PROBE_PATH=/path/to/ffprobe
FFMPEG_PATH=/path/to/ffmpeg
```
Replace YOUR_TELEGRAM_BOT_TOKEN with your actual Telegram bot token. Ensure you have the necessary paths for flvtool2, ffprobe, and ffmpeg.

### 4. Install FFmpeg
You need to have FFmpeg installed on your server to use some features of the bot, such as video compression and trimming. Follow the instructions below to install [FFmpeg](https://ffmpeg.org/) :

For Ubuntu:
```
sudo apt update
sudo apt install ffmpeg
```

### 5. Run the Bot

```
node index.js
```
## Usage
Once the bot is up and running, you can interact with it through Telegram. Start by sending a message to the bot, and it will guide you through available options.

## Contributing
Contributions are welcome! If you have any ideas for improving the bot or implementing new features, feel free to submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

