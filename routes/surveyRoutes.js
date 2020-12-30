const express = require('express');

const surveyController = require('../controller/surveyController');

const router = express.Router();

router.get('/api/survey/response/:id', surveyController.getSurveyResponse);

router.get('/api/survey/responses/:id', surveyController.getSurveyResponses);

router.post('/api/survey/response', surveyController.storeSurveyResponse);

router.post('/api/survey/send', surveyController.sendSurveyEmailLink);

router.post('/api/store_survey_form', surveyController.storeUserSurveyForm);

router.post('/api/store_survey_email_details', surveyController.storeSurveyEmailDetails);

router.post('/api/survey_data', surveyController.returnSurveyData);

router.get('/api/surveys', surveyController.getSurveyList);

router.post('/api/survey/delete', surveyController.deleteSurvey);

// router.post('/api/surveys', surveyController.getSurvey);

module.exports = router;
