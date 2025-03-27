import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const { name = 'stranger' } = event.queryStringParameters

  if (event.body) {
    const test = JSON.parse(event.body);
    console.log(test);
  }

  console.log("HERERER")
  console.log(event)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  }
}