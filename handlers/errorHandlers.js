// handles errors and prompts the user to try again
module.exports.ErrorHandler = ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, I did not understand your response, please try again.')
        .reprompt('Sorry, I did not understand your response, please try again.')
        .withShouldEndSession(false)
        .getResponse();
    },
  };

// handles when alexa doesn't understand the response, prompts the user to try again
module.exports.FallbackIntentHandler = FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        
        return handlerInput.responseBuilder
        .speak('Sorry, I did not understand your response, please try again.')
        .reprompt('Sorry, I did not understand your response, please try again.')
        .withShouldEndSession(false)
        .getResponse();
    }
};

// handle session end
module.exports.SessionEndedRequestHandler = SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
    
        return handlerInput.responseBuilder.getResponse();
    }
};
