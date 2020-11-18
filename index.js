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

// handle help intent request
const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can either say a number or a word';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Hello World', speechText)
        .getResponse();
    }
  };

  const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const speechText = 'Thanks for playing Fizz Buzz! Have a good day!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Hello World', speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
  };

  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      //any cleanup logic goes here
      return handlerInput.responseBuilder.getResponse();
    }
  };

  

// start the game and set session attributes to save progress
function startGame(handlerInput) {
    const speechOutput = "welcome to game"
    const sessionAttributes = {}
    Object.assign(sessionAttributes, {
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

function handlerUserAnswer(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const currentNumber = sessionAttributes.currentNumber
    const { intent } = handlerInput.requestEnvelope.request
    const userAnswer = intent.slots.Answer.value
    var correctAnswer = sessionAttributes.correctAnswer
    const nextNumber = currentNumber + 1
    const nextResponseNumber = currentNumber + 2
    var speechOutput = ""
    

    if (userAnswer == correctAnswer) {
        console.log(nextResponseNumber)
        if (nextResponseNumber % 3 == 0 && nextResponseNumber % 5 == 0) {
            console.log("changed")
            correctAnswer = "fizz buzz"
            console.log(correctAnswer)
            
        }
        else if (nextResponseNumber % 3 == 0) {
            console.log("changed")
            correctAnswer = "fizz"
            console.log(correctAnswer)
        }
        else if (nextResponseNumber % 5 == 0) {
            console.log("changed")
            correctAnswer = "buzz"
            console.log(correctAnswer)
        }
        else {
            console.log("error")
            correctAnswer = nextResponseNumber
        }
        console.log(correctAnswer)
        const sessionAttributes = {}
        Object.assign(sessionAttributes, {
            currentNumber: nextResponseNumber,
            correctAnswer: correctAnswer,
            score: 0
        });
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        speechOutput = (nextNumber).toString()

    } else {
        speechOutput = `I’m sorry, the correct response was ${correctAnswer}. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz`
    }
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();

}

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AnswerIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .lambda();