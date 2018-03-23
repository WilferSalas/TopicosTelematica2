const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({
  principalUser: String,
  shareUser: String,
  url: String
});

routesSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('routes', routesSchema);