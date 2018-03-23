const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  facebook: {
    email: String,
    password: String,
    id: String,
    token: String
  },
  google: {
    email: String,
    password: String,
    id: String,
    token: String
  }, 
  twitter: {
    email: String,
    password: String,
    id: String,
    token: String
  } 
});

userSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
};

//userSchema.methods.validPassword = function (password) {
//  return bcrypt.compareSync(password, this.password);
//};

userSchema.methods.validPassword = function (password){
  if (password == this.password){
    return true;
  }else{
    return false
  }
};

userSchema.virtual('date')
  .get(() => this._id.getTimestamp());

module.exports = mongoose.model('user', userSchema);