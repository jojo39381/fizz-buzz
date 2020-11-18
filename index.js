// import alexa sdk
const Alexa = require('ask-sdk-core');
const UtilFunctions = require('./util.js');

// handle launch request
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    
    // start the game
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
        // handle user answer
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
      const speechText = 'You can either say a number or a word like fizz, buzz, or fizz buzz';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Fizz Buzz', speechText)
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
        .withSimpleCard('Fizz Buzz', speechText)
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
        const lastResponse = checkFizzBuzz(lastNumber)
        const speechText = `${lastResponse}`

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Fizz Buzz', speechText)
        .withShouldEndSession(false)
        .getResponse();
    }
};

// handle session end
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
    
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
        .withShouldEndSession(false)
        .getResponse();
    },
  };

// handles when alexa doesn't understand the response, prompts the user to try again
const FallBackIntentHandler = {
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

// change the gamemode to hard -> make the number larger
const HardModeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'HardModeIntent';
    },
    handle(handlerInput) {
        // generate numbers >= 50 to 200
        const harderNumber = Math.floor(Math.random() * 200) + 50  
        const nextResponseNumber = harderNumber + 1
        const correctAnswer = checkFizzBuzz(nextResponseNumber)
        setSessionAttributes(harderNumber, nextResponseNumber, correctAnswer)
        speakOutput = `so you like a challenge. is this too easy? let's make it a little harder for you. I'll start... ${harderNumber}`
        repromptOutput = `${harderNumber}`
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptOutput)
        .withShouldEndSession(false)
        .getResponse()
        
    }
};




// start the game and set session attributes to save progress
function startGame(handlerInput) {
    const speechOutput = "Welcome to Fizz Buzz. We’ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word “fizz” and you must replace numbers divisible by 5 with the word “buzz”. If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. If you get one wrong, you lose... OK, I’ll start... One."
    // initialize game and set session attributes
    
    const startingNumber = 1
    const nextResponseNumber = startingNumber + 1
    const correctAnswer = checkFizzBuzz(nextResponseNumber)
    setSessionAttributes(startingNumber, nextResponseNumber, correctAnswer, handlerInput)
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .withShouldEndSession(false)
    .getResponse();

}


// handle user responses and determine if it is valid and correct
function handlerUserAnswer(handlerInput) {


    console.log("hit")
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const currentNumber = sessionAttributes.currentNumber
    const { intent } = handlerInput.requestEnvelope.request
    const userResponse = intent.slots
    
    var correctAnswer = sessionAttributes.correctAnswer
    const nextNumber = currentNumber + 1
    const nextResponseNumber = currentNumber + 2
    var speechOutput = ""
    var sessionEnd = false
    var userAnswer = null

    // check if answer is a number or word
    if (userResponse.Answer.value) {
        userAnswer = userResponse.Answer.value
    }
    else {
        userAnswer = userResponse.GameAns.value
    }
    // determine if user answer is correct and set the session attributes for the next input
    if (userAnswer.replace(/\s+/g, '') == correctAnswer) {
        
        // set the session attributes for the next input
        speechOutput = checkFizzBuzz(nextNumber).toString()
        correctAnswer = checkFizzBuzz(nextResponseNumber)
        
       
        setSessionAttributes(nextNumber, nextResponseNumber, correctAnswer, handlerInput)

    } else {
        sessionEnd = true
        speechOutput = `I'm sorry, the correct response was ${correctAnswer}. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz`
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
    SessionEndedRequestHandler,
    FallBackIntentHandler,
    HardModeIntentHandler,
    RepeatIntentHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();