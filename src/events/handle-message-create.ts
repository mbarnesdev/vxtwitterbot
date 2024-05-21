import { Message, spoiler } from "discord.js";

const fixHostname = "vxtwitter.com";

const validHostnames = ["x.com", "twitter.com"];

function extractTwitterLinks(messageContent: string) {
  const linkPattern = /\bhttps?:\/\/\S+|\|\|https?:\/\/\S+\|\|/gi;
  const links = messageContent.match(linkPattern) ?? [];

  return links
    .filter((link) => {
      const cleanedLink =
        link.startsWith("||") && link.endsWith("||") ? link.slice(2, -2) : link;
      try {
        const hostname = new URL(cleanedLink).hostname;
        return validHostnames.includes(hostname);
      } catch {
        return false;
      }
    })
    .map((link) => {
      const isSpoilered = link.startsWith("||") && link.endsWith("||");
      const cleanedLink = isSpoilered ? link.slice(2, -2) : link;

      const hostname = new URL(cleanedLink).hostname;
      const fixedLink = cleanedLink.replace(hostname, fixHostname);

      return isSpoilered ? `||${fixedLink}||` : fixedLink;
    });
}

export function handleMessageCreate(message: Message) {
  const isBot = message.author.bot;
  if (isBot) return;

  const links = extractTwitterLinks(message.content);
  if (!links.length) return;

  message.suppressEmbeds();

  for (let i = 0; i < links.length; ++i) {
    message.channel.send(links[i]);
  }
}
