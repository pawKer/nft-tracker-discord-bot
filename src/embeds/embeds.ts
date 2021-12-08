import { MessageEmbed } from "discord.js";

const getErrorEmbed = (
  name: string,
  address: string,
  errorCode: string,
  minutesToCheck: number
): MessageEmbed => {
  return new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(name)
    .setURL(`https://etherscan.io/address/${address}`)
    .setDescription(
      `Failed to fetch results for last ${minutesToCheck} minutes. Error code/reason: ${errorCode}`
    )
    .setTimestamp();
};

const getBasicMintInfoEmbed = (name: string, address: string): MessageEmbed => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(name)
    .setURL(`https://etherscan.io/address/${address}`)
    .setTimestamp();
};

const getFollowingInfoEmbed = (count: number): MessageEmbed => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Minting updates")
    .setDescription(`Currently watching ${count} addresses:`)
    .setTimestamp();
};

const getNoUpdatesEmbed = (minutes: number): MessageEmbed => {
  return new MessageEmbed()
    .setColor("#FFFF00")
    .setTitle(`No updates in the last ${minutes} minutes`)
    .setTimestamp();
};

const getHelpEmbed = (): MessageEmbed => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Commands")
    .setDescription(`The following commands are available:`)
    .addFields(
      {
        name: "/alert-channel",
        value: "Sets the current channel as the channel for the bot alerts.",
      },
      {
        name: "/info-channel",
        value: "Sets the current channel as the channel for bot info.",
      },
      {
        name: "/add `<address>` `<nickname>`",
        value: "Adds new ETH address to watchlist. ",
      },
      {
        name: "/remove `<address>`",
        value: "Removes ETH address to watchlist.",
      },
      {
        name: "/who",
        value: "Shows the addresses the bot is currently tracking.",
      },
      { name: "/toggle", value: "Starts/stops the scheduled messages." },
      {
        name: "/set-schedule `<minutes>`",
        value:
          "Sets the interval at which the bot will check the addresses. Needs to be between 1 and 60 minutes.",
      },
      {
        name: "/set-alert-role `@<role>`",
        value: "Sets a role that will be tagged when there is a new alert.",
      },
      {
        name: "/clear-alert-role",
        value: "Clears the alert role.",
      },
      {
        name: "/info",
        value: "Displays the current server configuration.",
      },
      { name: "/help", value: "Get the list of all possible commands." }
    )
    .setTimestamp();
};

const getInfoEmbed = (
  alertChannelId: string | undefined,
  infoChannelId: string | undefined,
  schedule: string,
  alertRole: string | undefined | null,
  messagesStatus: boolean | undefined
): MessageEmbed => {
  let infoEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Channel config info")
    .setDescription(`The following channels are being used for bot messages:`)
    .addFields(
      {
        name: "Scheduled messages status",
        value: messagesStatus ? "ON 🟢" : "OFF 🔴",
      },
      {
        name: "Alert channel",
        value: `<#${alertChannelId}>`,
      },
      {
        name: "Info channel",
        value: infoChannelId ? `<#${infoChannelId}>` : "Not set.",
      },
      {
        name: "Schedule",
        value: `The bot will check the addresses: \`${schedule}\`.`,
      },
      {
        name: "Alert role",
        value: alertRole ? `<@&${alertRole}>` : "No role set.",
      }
    )
    .setTimestamp();
  return infoEmbed;
};

export {
  getErrorEmbed,
  getBasicMintInfoEmbed,
  getFollowingInfoEmbed,
  getNoUpdatesEmbed,
  getHelpEmbed,
  getInfoEmbed,
};
