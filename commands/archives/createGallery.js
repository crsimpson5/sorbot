const Image = require("../../models/Image");
const getImageEmbed = require("./getImageEmbed");

const emojiList = ["⏪", "⬅️", "➡️", "⏩", "❔"];

async function createGallery(message) {
  function filter(reaction, user) {
    return emojiList.includes(reaction.emoji.name) && !user.bot;
  }

  const numImages = await Image.countDocuments();
  const rand = Math.floor(Math.random() * numImages);
  const embed = await getImageEmbed(rand);

  message.channel
    .send(embed)
    .then(async (msg) => {
      for (const emoji of emojiList) {
        await msg.react(emoji);
      }

      function createCollector(currentId) {
        const collector = msg.createReactionCollector(filter, {
          time: 30000,
          max: 1
        });

        collector.on("collect", async (reaction, user) => {
          const userReactions = msg.reactions.cache;

          try {
            for (const reaction of userReactions.values()) {
              for (const user of reaction.users.cache.array()) {
                if (user.id !== msg.author.id) {
                  reaction.users.remove(user.id);
                }
              }
            }
          } catch (error) {
            console.error("Failed to remove reaction.");
          }

          let newRand = Math.floor(Math.random() * numImages);
          if (newRand === currentId) newRand++;

          let newId;
          let newEmbed;

          switch (reaction.emoji.name) {
            case emojiList[0]: // first
              newId = 1;
              break;
            case emojiList[1]: // prev
              if (currentId-- > 1) {
                newId = currentId--;
              } else {
                newId = numImages;
              }
              break;
            case emojiList[2]: // next
              if (currentId++ < numImages) {
                newId = currentId++;
              } else {
                newId = 1;
              }
              break;
            case emojiList[3]: // last
              newId = numImages;
              break;
            case emojiList[4]: // random
              newId = newRand;
              break;
            default:
              newId = 1;
          }
          
          newEmbed = await getImageEmbed(newId);
          if (newEmbed && currentId !== newId) {
            msg.edit(newEmbed);
          }
          createCollector(newId);
        });

        collector.on("end", (collected) => {
          // console.log(JSON.stringify(collected));
        });
      }

      createCollector(rand);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = createGallery;
