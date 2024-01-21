import fetch from "node-fetch";
import config from "./config.json" with { type: "json" };
import {
  Client,
  GatewayIntentBits,
  GuildScheduledEventManager,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventEntityType,
} from "discord.js";

const response = await fetch("https://codeforces.com/api/contest.list");
const responseBody = await response.json();

console.log("Response: " + responseBody["status"]);

var parsedResponse = [];

for (var i = 0; i < responseBody["result"].length; i++) {
  var contest = responseBody["result"][i];
  if (contest["phase"] !== "FINISHED") {
    parsedResponse.push(contest);
  } else {
    break;
  }
}

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
  console.log(client);
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong");
    console.log("pong");
    console.log(message);
  }
});

// var options = {
//   host: "codeforces.com",
//   port: 443,
//   path: "/api/contest.list",
//   method: "GET",
// };
//
// var apiResponse;
// var req = https.request(options, (res) => {
//   console.log("STATUS: " + res.statusCode);
//   console.log("HEADERS: " + JSON.stringify(res.headers));
//   res.setEncoding("utf8");
//   res.on("data", (chunk) => {
//     var ResponseBody = chunk;
//     console.log("BODY: " + ResponseBody.status);
//   });
// });
//
// req.on("error", function (e) {
//   console.log("problem with request: " + e.message);
// });
//
// // write data to request body
// req.write("data\n");
// req.write("data\n");
// req.end();
//
// console.log(req);
//

client.on("messageCreate", (message) => {
  if (message.content === "fetchData") {
    // message.reply("Fk you buddy. That shit isn't working yet.");
    message.reply("test");
    console.log(parsedResponse);
    // message.reply(parsedResponse);
    //message.reply(apiResponse);
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "updateEvents") {
    message.reply("That shit ain't working yet bitch");
    const guild = client.guilds.cache.get(message.guildId);

    // await eventCreator.create({
    //   name: "Test Event",
    //   scheduledStartTime: new Date(1787284000000),
    //   scheduledEndTime: new Date(1787285000000),
    //   privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    //   entityType: 3,
    //   description: "This is a test Scheduled Event",
    //   entityMetadata: { location: "www.codeforces.com" },
    //   channel: message.channelId,
    //   image: null,
    //   reason: "Testing with creating a Scheduled Event",
    // });

    for (var i = 0; i < parsedResponse.length; i++) {
      const eventCreator = new GuildScheduledEventManager(guild);
      var contest = parsedResponse[i];
      await eventCreator.create({
        name: contest.name,
        scheduledStartTime: new Date(contest.startTimeSeconds * 1000),
        scheduledEndTime: new Date(contest.startTimeSeconds * 1000 + 7200000),
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: 3,
        description: "This is a test Scheduled Event",
        entityMetadata: { location: "www.codeforces.com/contests" },
        channel: message.channelId,
        image: null,
        reason:
          "This is a codeforces event created by the codeforces bot as per data from the codeforces api.",
      });
    }
  }
  //const eventCreator = GuildScheduledEventManager()
});

client.login(config.TOKEN);
