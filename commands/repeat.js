module.exports = {
  name: "repeat",
  args: true,
  guildOnly: false,
  usage: "<message>",
  execute(message, args) {
    message.channel.send(message.content.slice(this.name.length + 2));
  }
};
