const mongoose = require('mongoose')
const { Schema } = mongoose;

const surveySchema = new Schema({
  surveyName: String,
  surveyDataArray: [],
  surveyTitleArray: [],
  descriptionArray: [],
  surveyFooterText: String,
  surveyInputs: [],
  surveyCheckboxes: [],
  surveyRadioOptions: [],
  imageUrl: String,
  emailSubject: String,
  emailFrom: String,
  emailBody: String,
  emailRecipients: [String],
  noOfRespondents: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  isSent: { type: Boolean, default: false },
  dateSent: Date,
  lastResponded: Date
},
{ timestamps: true });

module.exports = mongoose.model('survey', surveySchema);
