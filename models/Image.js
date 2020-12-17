const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
autoIncrement.initialize(connection);

const ImageSchema = new Schema(
  {
    author: {
      type: String,
      trim: true,
      required: "Author is required"
    },
    url: {
      type: String,
      trim: true,
      required: "Url is required"
    },
    title: {
      type: String,
      trim: true
    },
    tags: {
      type: [String]
    },
    hash: {
      type: String,
      trim: true,
      required: "Hash is required"
    }
  },
  { timestamps: true }
);

ImageSchema.plugin(autoIncrement.plugin, {
  model: "Image",
  field: "id",
  startAt: 1
});
const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
