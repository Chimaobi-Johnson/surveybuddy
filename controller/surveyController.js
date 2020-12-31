const User = require('../models/User');
const Survey = require('../models/Survey');
const Response = require('../models/Response');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

const keys = require('../config/keys');


exports.getSurveyList = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 8;
  let totalItems;
  Survey.find({_user: req.user._id}).sort({ "createdAt": 1 }).countDocuments()
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
  const emailSubject = req.body.emailSubject;
  const emailBody = req.body.emailBody;
  const emailFrom = req.body.emailFrom;
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
      res.status(501).json({ message });
    } else {
       newUserCredit = userCredits - emailRecipientsArr.length;
       user.credits = newUserCredit;
    }
    return user.save();
  })
  .then(updatedUser => {
      Survey.findById(surveyId).then(survey => {
        if(!survey) {
          const error = new Error('Could not find survey');
          error.httpStatusCode = 404;
          throw error;
        }
        survey.emailSubject = emailSubject;
        survey.emailBody = emailBody;
        survey.emailFrom = emailFrom;
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

exports.storeUserSurveyForm = (req, res, next) => {
  let file;
  const surveyId = req.body.surveyId;
  const surveyName = req.body.surveyName;
  const surveyTitleArray = JSON.parse(req.body.surveyTitleArray);
  const descriptionArray = JSON.parse(req.body.descriptionArray);
  const surveyFooterText = req.body.surveyFooterText;
  if(!req.file) {
     file = null;
  } else {
     file = req.file.path.replace("\\" ,"/");
  }
  const surveyInputs = JSON.parse(req.body.surveyInputs);
  const surveyCheckboxes = JSON.parse(req.body.surveyCheckboxes);
  const surveyRadioOptions = JSON.parse(req.body.surveyRadioOptions);
  const surveyDataArray = JSON.parse(req.body.surveyDataArray);
  console.log(surveyId);
  if(surveyId == "null") {
    // if surveyId is null that means the user is saving survey for the first time
      const survey = new Survey({
          surveyName: surveyName,
          surveyTitleArray: [...surveyTitleArray],
          descriptionArray: [...descriptionArray],
          surveyFooterText: surveyFooterText,
          surveyInputs: {...surveyInputs},
          surveyCheckboxes: [...surveyCheckboxes],
          surveyRadioOptions: [...surveyRadioOptions],
          surveyDataArray: [...surveyDataArray],
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
           survey.surveyTitleArray = [...surveyTitleArray];
           survey.descriptionArray = [...descriptionArray];
           survey.surveyFooterText = surveyFooterText;
           survey.surveyInputs = {...surveyInputs};
           survey.surveyCheckboxes = [...surveyCheckboxes];
           survey.surveyRadioOptions = [...surveyRadioOptions];
           survey.surveyDataArray = [...surveyDataArray];
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

exports.deleteSurvey = (req, res, next) => {
   const surveyId = req.body.surveyId;
   Survey.deleteOne({ _id: surveyId })
   .then(response => {
      res.status(200).json({ message: "Survey deleted!" });
   })
   .catch(err => {
     const error = new Error(err);
     error.httpStatusCode = 500;
     return next(error);
   })
}

exports.sendSurveyEmailLink = (req, res, next) => {
  const { surveyId, emailRecipients, emailFrom, emailBody, emailSubject } = req.body;
    console.log(req.body)
    const transporter = nodemailer.createTransport(smtp({ 
      service: 'gmail',
      // secure: true,
      auth: {
        user: keys.email,
        pass: keys.password
      }
    })); 
  
    const mailOptions = {
      from: emailFrom,
      to: emailRecipients,
      subject: emailSubject,
      html: emailBody,
    };
    console.log(mailOptions);
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages', success);
      }
    });
   
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err
        Survey.findById(surveyId).then(survey => {
          if(!survey) {
            res.status(404).json({ message: "Survey not found! Might have been deleted" })
          }
          survey.isSent = true
          return survey.save();
        }).then(updatedSurvey => {
          res.status(200).json({ message: 'Mail sent successfully' })
        }).catch(err => {
          console.log(err)
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        })

    });
}

exports.storeSurveyResponse = (req, res, next) => {
  const response = new Response({
    ...req.body
  })
   return response.save()
  .then(success => {
    return Survey.findById(req.body._survey)
  }).then(survey => {
    if(!survey) {
      const error = new Error("Survey not found!")
      throw error
    }
    survey.noOfRespondents =+ 1
    return survey.save()
  }).then(result => {
    res.status(200).json({ message: 'Response stored successfully' })
  }).catch(err => {
    console.log(err)
  })
}


exports.getSurveyResponses = (req, res, next) => {
  const surveyId = req.params.id;
  Response.find({ _survey: surveyId })
  .then(result => {
    res.status(200).json({ responseList: result })
  }).catch(err => {
    console.log(err)
  })
}


exports.getSurveyResponse = (req, res, next) => {

}