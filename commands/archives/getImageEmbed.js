const Image = require("../../models/Image");

const imageEmbed = require("../../embeds/imageEmbed");

// const numDocs = await Image.countDocuments();

function getImageEmbed(id) {
  return new Promise(async (resolve, reject) => {
    if (typeof(parseInt(id)) == "number") {
      let doc = null;

      try {
        doc = await Image.findOne({ id }).exec();

        if (doc) {
          resolve(
            imageEmbed({
              url: doc.url,
              title: doc.title,
              id: doc.id,
              tags: doc.tags
            })
          );
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(new Error());
      }
    }
  });
}

module.exports = getImageEmbed;
