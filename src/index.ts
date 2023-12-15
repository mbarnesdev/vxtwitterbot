import { Client, GatewayIntentBits, Events } from "discord.js"
import { token } from "../config.json"

const validHostnames = [
    "x.com",
    "twitter.com",
]

const fixHostname = "vxtwitter.com"

const getHostname = (url: string) => new URL(url).hostname

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages
  ],
});

client.on(Events.MessageCreate, (message: any) => {
    const isBot = message.author.bot;
    const hasEmbed = !!message.embeds.length;

    if (isBot) return;
    if (hasEmbed) return;

    const hostname = getHostname(message.content)
    const isValidHostname = validHostnames.includes(hostname)

    if (!isValidHostname) return;

    message.reply(message.content.replace(hostname, fixHostname))
});

client.login(token);
