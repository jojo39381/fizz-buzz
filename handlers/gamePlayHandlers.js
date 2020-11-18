const {checkFizzBuzz, setSessionAttributes}= require('../utils.js');
// handle launch request
module.exports = LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      
      // start the game
      return startGame(handlerInput)
    }
  };


// handle intent request and check if it is an answer intent
module.exports = AnswerIntentHandler = {
    
    canHandle(handlerInput) {
        
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent';
    },
    handle(handlerInput) {
        // handle user answer
        return handlerUserAnswer(handlerInput)
        
    }
  };



// change the gamemode to hard -> make the number larger
module.exports = HardModeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'HardModeIntent';
    },
    handle(handlerInput) {
        // generate numbers >= 50 to 200
        const harderNumber = Math.floor(Math.random() * 200) + 50  
        const nextUserResponseNumber = harderNumber + 1
        const correctAnswer = checkFizzBuzz(nextUserResponseNumber)
        setSessionAttributes(harderNumber, nextUserResponseNumber, correctAnswer, handlerInput)
        speakOutput = `so you like a challenge. is this too easy? let's make it a little harder for you. I'll start... ${harderNumber}`
        repromptOutput = `${harderNumber}`
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptOutput)
        .withSimpleCard('Fizz Buzz', speakOutput)
        .withShouldEndSession(false)
        .getResponse()
        
    }
};


  // start the game and set session attributes to save progress
function startGame(handlerInput) {
    const speechOutput = "Welcome to Fizz Buzz. We’ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word “fizz” and you must replace numbers divisible by 5 with the word “buzz”. If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. If you get one wrong, you lose... OK, I’ll start... One."
    // initialize game and set session attributes
    
    const startingNumber = 1
    const nextUserResponseNumber = startingNumber + 1
    const correctAnswer = checkFizzBuzz(nextUserResponseNumber)
    setSessionAttributes(startingNumber, nextUserResponseNumber, correctAnswer, handlerInput)
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .withSimpleCard('Fizz Buzz', speechOutput)
    .withShouldEndSession(false)
    .getResponse();

}

// handle user responses and determine if it is valid and correct
function handlerUserAnswer(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const currentNumber = sessionAttributes.currentNumber
    const { intent } = handlerInput.requestEnvelope.request
    const userResponse = intent.slots
    
    var correctAnswer = sessionAttributes.correctAnswer
    const nextNumber = currentNumber + 1
    const nextUserResponseNumber = currentNumber + 2

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
    //removes space so the user can say both fizz buzz or fizzbuzz
    if (userAnswer.replace(/\s+/g, '') == correctAnswer.replace(/\s+/g, '')) {
        
        // set the session attributes for the next input
        speechOutput = checkFizzBuzz(nextNumber)
        correctAnswer = checkFizzBuzz(nextUserResponseNumber)
        
        // session attributes 
        // lastNumber:
        // currentNumber:
        // correctAnswer:

        setSessionAttributes(nextNumber, nextUserResponseNumber, correctAnswer, handlerInput)
    } else {
        sessionEnd = true
        speechOutput = `I'm sorry, the correct response was ${correctAnswer}. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!`
    }

    return handlerInput.responseBuilder
    .speak(speechOutput)
    .reprompt(speechOutput)
    .withSimpleCard('Fizz Buzz', speechOutput)
    .withShouldEndSession(sessionEnd)
    .getResponse();

}