const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  fb_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profile_pic: { type: String, required: true },
  locale: { type: String, required: true },
  gender: { type: String, required: true },
  timezone: { type: String, required: true }
});

module.exports = mongoose.model("user", userSchema);
