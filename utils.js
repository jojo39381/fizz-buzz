// check if number should be changed to fizz, buzz, fizzbuzz, or stay the same, and return the change 
module.exports = function checkFizzBuzz(number) {
    if (number % 3 == 0 && number % 5 == 0) {
        
        return "fizz buzz"
        
    }
    else if (number % 3 == 0) {
        
        correctAnswer = "fizz"
       
        return "fizz"
    }
    else if (number % 5 == 0) {
        
        correctAnswer = "buzz"
        
        return "buzz"
    }
    else {
        
        return number.toString()
    }
}

// set session attributes to store game progress. lastNumber is the last number alexa said, currentNumber is the number the user will say, and correctAnswer is the right answer
module.exports = function setSessionAttributes(lastNumber, currentNumber, correctAnswer, handlerInput) {
    const sessionAttributes = {}
    Object.assign(sessionAttributes, {
        lastNumber: lastNumber,
        currentNumber: currentNumber,
        correctAnswer: correctAnswer
            
    });
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
}// check if number should be changed to fizz, buzz, fizzbuzz, or stay the same, and return the change 
module.exports.checkFizzBuzz = function checkFizzBuzz(number) {
    if (number % 3 == 0 && number % 5 == 0) {
        
        return "fizz buzz"
        
    }
    else if (number % 3 == 0) {
        
        correctAnswer = "fizz"
       
        return "fizz"
    }
    else if (number % 5 == 0) {
        
        correctAnswer = "buzz"
        
        return "buzz"
    }
    else {
        
        return number.toString()
    }
}


// set session attributes to store game progress. lastNumber is the last number alexa said, currentNumber is the number the user will say, and correctAnswer is the right answer
module.exports.setSessionAttributes = function setSessionAttributes(lastNumber, currentNumber, correctAnswer, handlerInput) {
    const sessionAttributes = {}
    Object.assign(sessionAttributes, {
        lastNumber: lastNumber,
        currentNumber: currentNumber,
        correctAnswer: correctAnswer
            
    });
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
}

