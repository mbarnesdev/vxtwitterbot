import { Message } from "discord.js"

const fixHostname = "vxtwitter.com"

const validHostnames = [
    "x.com",
    "twitter.com",
]

function extractTwitterLinks(messageContent: string) {
    const links = messageContent.match(/\bhttps?:\/\/\S+/gi) ?? [];
    
    return links
        .filter((link) => {
            const hostname = new URL(link).hostname
            return validHostnames.includes(hostname)
        })
        .map((link) => {
            const hostname = new URL(link).hostname
            return link.replace(hostname, fixHostname)
        })
}

export function handleMessageCreate(message: Message) {
    const isBot = message.author.bot
    if (isBot) return

    const links = extractTwitterLinks(message.content)
    if (!links.length) return;

    message.suppressEmbeds();

    for (let i = 0; i < links.length; ++i) {
        message.channel.send(links[i])
    }
}
