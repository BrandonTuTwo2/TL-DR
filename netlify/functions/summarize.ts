import { Handler } from "@netlify/functions";
import OpenAI from "openai";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.ROUTER_API,
  timeout: 120000, // 120 seconds
});

export const handler: Handler = async (event) => {
  if (event.body) {
    const jsonBody = JSON.parse(event.body);
    console.log("waiting...");
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free:online", //meta-llama/llama-4-maverick:free being poor sucks :(
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `summarize the information on the link into bullet points using only information from this link and no other external source: ${jsonBody.url}`,
            },
          ],
        },
      ],
    });

    console.log("DONE!");
    console.log(completion);
    console.log(completion.choices[0].message);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: completion.choices[0].message,
      }),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Error",
      }),
    };
  }
};
