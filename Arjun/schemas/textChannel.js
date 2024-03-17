






const { Schema, model } = require("mongoose");

const textChannels = new Schema({
  ChannelId: {
    type: String,
  },
  GuildID: String,
});

const MessageModel = (module.exports = model("textChannels", textChannels));