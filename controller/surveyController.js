const User = require('../models/User');
const Survey = require('../models/Survey');
const fs = require('fs');
const path = require('path');


exports.getSurveyList = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 8;
  let totalItems;
  Survey.find({_user: req.user._id}).countDocuments()
  .then(count => {
    totalItems = count;
    return Survey.find({_user: req.user._id})
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
  })
  .then(survey => {
    res.status(200).json({ surveys: survey, totalItems: totalItems });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
}
//
// exports.getSurvey = (req, res) => {
//   const surveyId = req.body.surveyId;
//   Survey.findById(surveyId).then(survey => {
//     res.status(200).json({ surveyForm: survey });
//   }).catch(err => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     return next(error);
//   })
// }

exports.returnSurveyData = (req, res) => {
  const surveyId = req.body.surveyId;
  Survey.findById(surveyId)
  .then(survey => {
    if(!survey) {
      const error = new Error('Could not find survey');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({survey: survey});
  })
  .catch(err => console.log(err));
}

exports.storeSurveyEmailDetails = (req, res) => {
  console.log(req.body);
  const emailSubject = req.body.emailSubject;
  const emailBody = req.body.emailBody;
  const emailRecipients = req.body.emailRecipients;
  const surveyId = req.body.surveyId;
  const emailRecipientsArr = emailRecipients.trim().split(',');
  let userCredits, message, newUserCredit;
  User.findById(req.user._id)
  .then(user => {
    if(!user) {
      return;
    }
    userCredits = user.credits;
    if(userCredits < emailRecipientsArr.length) {
      if(emailRecipientsArr.length === 1) {
        message = 'You currently do not have enough credits for ' + emailRecipientsArr.length + ' client';
      } else {
        message = 'You currently do not have enough credits for ' + emailRecipientsArr.length + ' clients';
      }
      res.status(500).json({ message });
    } else {
       newUserCredit = userCredits - emailRecipientsArr.length;
       user.credits = newUserCredit;
    }
    return user.save();
  })
  .then(updatedUser => {
       console.log(updatedUser);
       console.log(surveyId);
      Survey.findById(surveyId).then(survey => {
        if(!survey) {
          const error = new Error('Could not find survey');
          error.httpStatusCode = 404;
          throw error;
        }
        survey.emailSubject = emailSubject;
        survey.emailBody = emailBody;
        survey.emailRecipients = emailRecipientsArr;
        return survey.save()
     }).then(result => {
          res.status(200).json({ message: 'Survey email details saved' });
     })
   })
   .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });

}

exports.storeUserSurveyForm = (req, res) => {
  let file;
  const surveyId = req.body.surveyId;
  const surveyName = req.body.surveyName;
  const surveyTitleText = req.body.surveyTitleText;
  const surveyDescrText = req.body.surveyDescrText;
  const surveyFooterText = req.body.surveyFooterText;
  if(!req.file) {
     file = null;
  } else {
     file = req.file.path.replace("\\" ,"/");
  }
  const surveyInputs = JSON.parse(req.body.surveyInputs);
  const surveyCheckboxes = JSON.parse(req.body.surveyCheckboxes);
  const surveyRadioOptions = JSON.parse(req.body.surveyRadioOptions);
  console.log(surveyId);
  if(surveyId === "null") {
    // if surveyId is null that means the user is saving survey for the first time
      const survey = new Survey({
          surveyName: surveyName,
          surveyTitleText: surveyTitleText,
          surveyDescrText: surveyDescrText,
          surveyFooterText: surveyFooterText,
          surveyInputs: {...surveyInputs},
          surveyCheckboxes: {...surveyCheckboxes},
          surveyRadioOptions: {...surveyRadioOptions},
          imageUrl: file,
          _user: req.user._id
        });
        survey.save()
        .then(result => {
          res.status(200).json({ surveyForm: survey, message: 'survey saved successfully' });
        }).catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        })

    } else {
    // if surveyId is not null check for surveyId
         Survey.findById(surveyId).then(survey => {
           if(!survey) {
             const error = new Error('Could not find survey');
             error.statusCode = 404;
             throw error;
           }

           survey.surveyName = surveyName;
           survey.surveyTitleText = surveyTitleText;
           survey.surveyDescrText = surveyDescrText;
           survey.surveyFooterText = surveyFooterText;
           survey.surveyInputs = {...surveyInputs};
           survey.surveyCheckboxes = {...surveyCheckboxes};
           survey.surveyRadioOptions = {...surveyRadioOptions};
           survey.imageUrl = file;
           survey._id = surveyId;
           survey.save()
           .then(result => {
             res.status(200).json({ surveyForm: survey, message: 'survey updated' });
           })
           .catch(err => {
             const error = new Error(err);
             error.httpStatusCode = 500;
             return next(error);
         })


         }).catch(err => {
           const error = new Error(err);
           error.httpStatusCode = 500;
           return next(error);
         })


  }
}
