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

// handle help intent request and provide help
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


// handle cancel and stop intent requests and end the session
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

// handle repeat intent requests and repeat the previous number said by Alexa
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        // get last number said by Alexa
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const lastNumber = sessionAttributes.lastNumber
        const speechText = `${lastNumber}`

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Hello World', speechText)
        .getResponse();
    }
};

// handle session end
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};


// handles errors and prompts the user to try again
const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, I did not understand your response, please try again.')
        .reprompt('Sorry, I did not understand your response, please try again.')
        .getResponse();
    },
  };
  

// start the game and set session attributes to save progress
function startGame(handlerInput) {
    const speechOutput = "Welcome to Fizz Buzz. Weâ€™ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word â€œfizzâ€ and you must replace numbers divisible by 5 with the word â€œbuzzâ€. If a number is divisible by both 3 and 5, you should instead say â€œfizz buzzâ€. If you get one wrong, you lose. OK, Iâ€™ll start... One."

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
    var sessionEnd = false
    // determine if user answer is correct and set the session attributes for the next input
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
        // set the session attributes for the next input
        const sessionAttributes = {}
        Object.assign(sessionAttributes, {
            lastNumber: nextNumber,
            currentNumber: nextResponseNumber,
            correctAnswer: correctAnswer,
            score: 0
        });
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        speechOutput = (nextNumber).toString()

    } else {

        sessionEnd = true
        speechOutput = `I am sorry, the correct response was ${correctAnswer}. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz`
    }
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .withShouldEndSession(sessionEnd)
    .getResponse();

}



exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AnswerIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();