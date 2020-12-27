const mongoose = require('mongoose')
const { Schema } = mongoose;

const surveySchema = new Schema({
  surveyName: String,
  componentArray: [],
  surveyTitleArray: [],
  descriptionArray: [],
  surveyFooterText: String,
  surveyInputs: [],
  surveyCheckboxes: [],
  surveyRadioOptions: [],
  imageUrl: String,
  emailSubject: String,
  emailBody: String,
  emailRecipients: [String],
  noOfRespondents: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  isSent: { type: String, default: 'No' },
  dateCreated: { type : Date, default: Date.now },
  dateSent: Date,
  lastResponded: Date
});

module.exports = mongoose.model('survey', surveySchema);
