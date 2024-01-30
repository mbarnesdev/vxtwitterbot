import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { handleMessageCreate } from "./events/handle-message-create"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ],
})

client.on(Events.MessageCreate, handleMessageCreate);

async function main() {
    await client.login(process.env.DISCORD_TOKEN)
}

main()
