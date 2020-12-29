const mongoose = require('mongoose')
const { Schema } = mongoose;

const responseSchema = new Schema({
  surveyName: String,
  surveyDataArray: [],
  surveyTitleArray: [],
  descriptionArray: [],
  surveyFooterText: String,
  surveyInputs: [],
  surveyCheckboxes: [],
  surveyRadioOptions: [],
  imageUrl: String,
  _survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
},
{ timestamps: true });

module.exports = mongoose.model('response', responseSchema);
