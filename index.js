import { Client, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";
import config from "./config.json" with { type: "json" };

const response = await fetch("https://codeforces.com/api/contest.list");
const responseBody = await response.json();

console.log("Response: " + responseBody["status"]);

var parsedResponse = "";

for (var i = 0; i < responseBody["result"].length; i++) {
  var contest = responseBody["result"][i];
  if (contest["phase"] !== "FINISHED") {
    parsedResponse += JSON.stringify(contest);
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
  console.log(client.channels);
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong");
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
    message.reply(parsedResponse);
    //message.reply(apiResponse);
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "updateEvents") {
    message.reply("That shit ain't working yet bitch");
  }
});

client.login(config.TOKEN);
