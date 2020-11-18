const Alexa = require('ask-sdk-core');


// handle launch request
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

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

const speechOutput = "welcome to game"

function startGame(handlerInput) {
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
        if (nextResponseNumber % 3 == 0 && nextResponseNumber % 5 == 0) {
            correctAnswer = "fizz buzz"
            
        }
        if (nextResponseNumber % 3 == 0) {
            correctAnswer = "fizz"
        }
        if (nextResponseNumber % 5 == 0) {
            correctAnswer = "buzz"
        }
        else {
            correctAnswer = nextResponseNumber
        }
        const sessionAttributes = {}
        Object.assign(sessionAttributes, {
            currentNumber: nextResponseNumber,
            correctAnswer: correctAnswer,
            score: 0
        });
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        speechOutput = (nextNumber).toString()

    } else {
        speechOutput = "Iâ€™m sorry, the correct response was " + correctAnswer + "You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz"
    }
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .getResponse();

}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AnswerIntentHandler)
    .addErrorHandlers(
        )
    .lambda();

