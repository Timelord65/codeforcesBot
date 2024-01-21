const { Client, GatewayIntentBits } = require("discord.js");
var config = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.channels);
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong");
  }
});

client.login(config.TOKEN);
