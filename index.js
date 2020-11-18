// import alexa sdk
const Alexa = require('ask-sdk-core');
const {LaunchRequestHandler, AnswerIntentHandler, HardModeIntentHandler} = require('./gamePlayHandlers.js');
const {HelpIntentHandler, CancelAndStopIntentHandler, RepeatIntentHandler} = require('./commandHandlers.js');
const {SessionEndedRequestHandler, FallbackIntentHandler, ErrorHandler} = require('./errorHandlers.js');


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AnswerIntentHandler,
    HardModeIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    RepeatIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler
    
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();