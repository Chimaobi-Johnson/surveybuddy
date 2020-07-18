const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: Number,
  facebookId: Number,
  firstName: String,
  displayName: String,
  email: String,
  profilePhoto: String,
  password: String,
  credits: { type: Number, default: 0 },
  payments: [
    {
			type: Schema.Types.ObjectId,
			ref: 'Payment'
		}
  ]
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
