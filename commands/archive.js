const Image = require("../models/Image");
const getImageHash = require("./archive/getImageHash");
const getTitleAndTags =  require("./archive/getTitleAndTags");

const archiveHelpEmbed = require("../embeds/archiveHelpEmbed");

async function execute(message, args) {
  if (
    args[0] === "help" ||
    (args[0] == null && !message.attachments.array()[0])
  ) {
    return message.channel.send(archiveHelpEmbed);
  }

  let url = "";

  if (message.attachments.array()[0]) {
    url = message.attachments.array()[0].url;
  } else if (!RegExp(/^https:.+$/).test(args[0])) {
    return message.channel.send("Could not archive: invalid url");
  } else {
    url = args[0];
  }

  const hash = await getImageHash(url).catch((err) => console.log(err));
  if (!hash) {
    return  message.channel.send("Invalid image");
  }

  let matchingDoc = null;

  try {
    matchingDoc = await Image.findOne({ hash }).exec();
  } catch (err) {
    return message.channel.send("Archives not found.");
  }

  if (matchingDoc) {
    return message.channel.send(`Image already in archives! ID: ${matchingDoc.id}`);
  }

  const { title, tags } = getTitleAndTags(args);

  const doc = new Image({
    author: message.author.id,
    url,
    title: title || "Untitled",
    tags,
    hash
  });

  // doc.resetCount((err, count) => console.log(count));

  doc
    .save()
    .then(() => {
      message.react("✅");
    })
    .catch((err) => {
      message.channel.send("Unable to save document.");
      console.log(err);
    });
}

module.exports = {
  name: "archive",
  aliases: ["a"],
  args: false,
  guildOnly: false,
  usage: "",
  execute: execute
};
