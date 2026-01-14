import OpenAI from "openai";

export async function handler(event, context) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = JSON.parse(event.body).prompt;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: response.choices[0].message.content }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
