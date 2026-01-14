import OpenAI from "openai";

export async function handler(event, context) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { prompt } = JSON.parse(event.body);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: completion.choices[0].message.content }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
