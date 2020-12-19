const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// users schema
const userSchema = new Schema({
  userid: String,
  username: String,
});

// export user model
module.exports = User = mongoose.model('user', userSchema);
