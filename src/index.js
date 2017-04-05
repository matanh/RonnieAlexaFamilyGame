/**
 
 Copyright 2016 Brian Donohue.
 
*/

'use strict';

exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
		 
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    var cardTitle = "Hello, World!"
    var speechOutput = "Hi Ronnie, I`m so happy to speek to you. Let`s play the name game"
    callback(session.attributes,
        buildSpeechletResponse(cardTitle, speechOutput, "", true));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == 'MommyName') {
        handleTestRequest(intent, session, callback);
    }
    if (intentName == 'DaddyName') {
        handleTestRequest(intent, session, callback);
    }
    
    if (intentName == 'RonnieName') {
        handleTestRequest(intent, session, callback);
    }
    
     if (intentName == 'AskRonnieName') {
        handleTestRequest(intent, session, callback);
    }
    
    if (intentName == 'Love') {
        handleTestRequest(intent, session, callback);
    }
    
    else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);
}

function handleTestRequest(intent, session, callback) {
    
     var   intentName = intent.name;
         
         if (intentName == 'MommyName') {
             callback(session.attributes,
             buildSpeechletResponseWithoutCard("Your Mommy's name is Ra-Helli. Ra-Helli Hadaddy.", "", "true"));
         }
         
         if (intentName == 'DaddyName') {
             callback(session.attributes,
             buildSpeechletResponseWithoutCard("Your Daddy's name is Ma-ttan. Ma-ttan Hadaddy", "", "true"));
         }
         
         if (intentName == 'RonnieName') {
             callback(session.attributes,
             buildSpeechletResponseWithoutCard("Ronnie, your name is Ronnie Hadaddy", "", "true"));
         }
         
         if (intentName == 'AskRonnieName') {
             callback(session.attributes,
             buildSpeechletResponseWithoutCard("Ronnie, tell me, what is your name.", "", "true"));
         }
         
         if (intentName == 'Love') {
             callback(session.attributes,
             buildSpeechletResponseWithoutCard("Ronnie, mommy and daddy love you so much. You are the love of their lives.", "", "true"));
         }
        
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("", "", "true"));
}

// ------- Helper functions to build responses -------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}