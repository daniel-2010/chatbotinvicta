const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  previous_job: { type: String, required: true },
  years_of_experience: { type: String, required: true },
  job_vacancy: { type: String, required: true }
});

module.exports = mongoose.model("employment", postSchema);
