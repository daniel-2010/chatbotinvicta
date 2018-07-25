const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  fb_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profile_pic: { type: String},
  locale: { type: String},
  gender: { type: String },
  timezone: { type: String}
});

module.exports = mongoose.model("user", userSchema);
