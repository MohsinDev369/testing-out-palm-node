const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();

const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file only for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/ai", async (req, res) => {
  const { animalName } = req.query;

  const prompt = `write a funny story about the animal ${animalName}, Make the story funny, But small and brief. The story should have a life lesson that the reader and take away from this story. The story should be short and funny.`;

  client
    .generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    })
    .then((result) => {
      //   console.log(JSON.stringify(result[0].candidates[0].output, null, 2));
      res.send(JSON.stringify(result[0].candidates[0].output, null, 2));
    });
  // res.send(JSON.stringify(animalName));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
