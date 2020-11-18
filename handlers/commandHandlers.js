const {checkFizzBuzz} = require('../utils.js');
// handle help intent request and provide help
module.exports.HelpIntentHandler = HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can either say a number or a word like fizz, buzz, or fizz buzz';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Fizz Buzz', speechText)
        .getResponse();
    }
  };



// handle cancel and stop intent requests and end the session
module.exports.CancelAndStopIntentHandler = CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Thanks for playing Fizz Buzz! Have a good day!';

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Fizz Buzz', speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
};


// handle repeat intent requests and repeat the previous number said by Alexa
module.exports.RepeatIntentHandler = RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        // get last number said by Alexa
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const lastNumber = sessionAttributes.lastNumber
        const lastResponse = checkFizzBuzz(lastNumber)
        const speechText = `${lastResponse}`

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Fizz Buzz', speechText)
        .withShouldEndSession(false)
        .getResponse();
    }
};