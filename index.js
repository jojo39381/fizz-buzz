// import alexa sdk
const Alexa = require('ask-sdk-core');
const {LaunchRequestHandler, AnswerIntentHandler, HardModeIntentHandler} = require('./handlers/gamePlayHandlers.js');
const {HelpIntentHandler, CancelAndStopIntentHandler, RepeatIntentHandler} = require('./handlers/commandHandlers.js');
const {SessionEndedRequestHandler, FallbackIntentHandler, ErrorHandler} = require('./handlers/errorHandlers.js');


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