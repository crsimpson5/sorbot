const archiveHelpEmbed = require("../embeds/archiveHelpEmbed");

const createGallery = require("./archives/createGallery");
const getImageEmbed = require("./archives/getImageEmbed");

async function execute(message, args) {
  if (args[0] === "help") {
    return message.channel.send(archiveHelpEmbed);
  }

  if (args[0] == null) {
    createGallery(message);
    return;
  }

  const id = args[0];
  if (isNaN(id)) {
    return message.channel.send("Usage: `!archives <id>`");
  }

  try {
    const embed = await getImageEmbed(id);

    if (embed != null) {
      return message.channel.send(embed);
    } else {
      return message.channel.send("Image not found.");
    }
  } catch (err) {
    return message.channel.send("Archives not found.");
  }
}

module.exports = {
  name: "archives",
  args: false,
  guildOnly: true,
  usage: "",
  execute: execute
};
