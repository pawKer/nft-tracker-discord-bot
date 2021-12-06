import { SlashCommandBuilder } from "@discordjs/builders";
import { Guild } from "discord.js";
import { Command } from "../../../@types/bot";

const alertRoleCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("alert-role")
    .setDescription("Set a channel for alerts.")
    .addRoleOption((option) =>
      option
        .setRequired(true)
        .setName("role")
        .setDescription("A role that will be tagged when alerts are sent.")
    ),
  async execute(client: any, interaction: any) {
    const guild: Guild = interaction.guild;
    const cacheItem = client.serverCache.get(guild.id);
    cacheItem.alertRole = interaction.options.getRole("role").id;
    client.db.save(guild.id, {
      alertRole: cacheItem.alertRole,
    });
    await interaction.reply(`Alert role set to: <@&${cacheItem.alertRole}>.`);
  },
};
export default alertRoleCommand;
