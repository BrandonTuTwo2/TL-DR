import { Handler } from '@netlify/functions'
import OpenAI from 'openai';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.ROUTER_API,
});


export const handler: Handler = async (event, context) => {
  const { name = 'stranger' } = event.queryStringParameters

  const test = JSON.parse(event.body);
  console.log(test);
  const completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1:free',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: "text",
            text: `summarize this article into bullet points for me using only information from this link: ${test.url}`
          }
        ],
      },
    ],
  });
  console.log(completion)
  console.log(completion.choices[0].message);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  }
}