require("dotenv").config();

const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});


function aiRes(animal) {
  const prompt =
    `write a funny story about the animal ${animal}, Make the story funny, But small and brief. The story should have a life lesson that the reader and take away from this story. The story should be short and funny.`;
  
  client
    .generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].candidates[0].output, null, 2));
      return JSON.stringify(result[0].candidates[0].output, null, 2);
    });
}

