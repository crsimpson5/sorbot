const Image = require("../models/Image");

const imageEmbed = require("../embeds/imageEmbed");
const archiveHelpEmbed = require("../embeds/archiveHelpEmbed");

async function execute(message, args) {
  if (args[0] === "help") {
    return message.channel.send(archiveHelpEmbed);
  }

  const id = args[0];
  if (isNaN(id)) {
    return message.channel.send("Usage: `!archives <id>`");
  }

  let doc = null;

  try {
    doc = await Image.findOne({ id }).exec();
  } catch (err) {
    return message.channel.send("Archives not found.");
  }

  if (doc) {
    const embed = imageEmbed({
      url: doc.url,
      title: doc.title,
      id: doc.id,
      tags: doc.tags
    });

    message.channel.send(embed);
  } else {
    message.channel.send("Image not found.");
  }
}

module.exports = {
  name: "archives",
  args: false,
  guildOnly: true,
  usage: "",
  execute: execute
};
