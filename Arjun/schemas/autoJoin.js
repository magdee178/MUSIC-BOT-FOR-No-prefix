const mongoose = require("mongoose");

const JoinSchema = new mongoose.Schema({
    voiceChannel: {
    type: String,
			
  },
	textChannel: {
		type: String,
	},
	  _24h: Boolean,
	  guildID: String,
})

module.exports = mongoose.model('autoJoin', JoinSchema);