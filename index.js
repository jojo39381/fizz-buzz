const Alexa = require('ask-sdk-core');


// handle launch request
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    

    return startGame(handlerInput)
  }
};


// handle intent request and check if it is an answer intent
const AnswerIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent';
    },
    handle(handlerInput) {
        return handlerUserAnswer(handlerInput)
        
    }
  };

  

// start the game and set session attributes to save progress
function startGame(handlerInput) {
    const speechOutput = "Welcome to Fizz Buzz. We’ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word “fizz” and you must replace numbers divisible by 5 with the word “buzz”. If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. If you get one wrong, you lose. ... OK, I’ll start... One."
    // initialize game and set session attributes
    const sessionAttributes = {}
    Object.assign(sessionAttributes, {
        lastNumber: 1,
        currentNumber: 2,
        correctAnswer: 2,
        score: 0
        
      });
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();

}

// handle user responses and determine if it is valid and correct
function handlerUserAnswer(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const currentNumber = sessionAttributes.currentNumber
    const { intent } = handlerInput.requestEnvelope.request
    const userAnswer = intent.slots.Answer.value
    var correctAnswer = sessionAttributes.correctAnswer
    const nextNumber = currentNumber + 1
    const nextResponseNumber = currentNumber + 2
    var speechOutput = ""
    

}









exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AnswerIntentHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();