const mongoose = require('mongoose')
const { Schema } = mongoose;

const recipientSchema = new Schema({
  surveyName: String,
  surveyInputs: {},
  surveyCheckboxes: {
    checkboxOne: {
      surveyCheckboxQuestion: String,
      surveyCheckboxNames: {},
    },
    checkboxTwo: {
      surveyCheckboxQuestion: String,
      surveyCheckboxNames: {},
    },
    checkboxThree: {
      surveyCheckboxQuestion: String,
      surveyCheckboxNames: {},
    }
  },
  surveyRadioOptions: {
    radioOne: {
      surveyRadioQuestion: String,
      surveyRadioOptionNames: [],
      surveyRadioAnswer: String
    },
    radioTwo: {
      surveyRadioQuestion: String,
      surveyRadioOptionNames: [],
      surveyRadioAnswer: String
    },
    radioThree: {
      surveyRadioQuestion: String,
      surveyRadioOptionNames: [],
      surveyRadioAnswer: String
    }
  },
  _survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
  dateSubmitted: Date
});

mongoose.model('recipient', recipientSchema);
