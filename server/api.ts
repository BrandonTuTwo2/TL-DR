import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from 'openai';
import { config } from "dotenv";

const api = express();

config();
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.ROUTER_API,
  timeout: 120000 // 120 seconds
});

const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();

const corsOptions = {
    origin: '*',
    credential: true,
    optionSuccessStatus: 200,
}

api.use(cors(corsOptions));

api.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

console.log("HUH??");

api.post("/summarize", jsonParser, async(req,res) => {
    console.log("Here is req")
    console.log(req.body.url);
    const startTime = performance.now();
    const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: "text",
                text: `summarize the information into bullet points for me using only information from this link: ${req.body.url}`
              }
            ],
          },
        ],
      });
      const endTime = performance.now();
      console.log("DONE!")
      console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
      console.log(completion)
      console.log(completion.choices[0].message.content);
    res.send({
        body: completion.choices[0].message.content
    })
})

