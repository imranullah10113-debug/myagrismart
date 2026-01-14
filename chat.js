const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { text, language } = JSON.parse(event.body);

  // Your OpenAI key here
  const OPENAI_KEY = process.env.OPENAI_API_KEY;

  const systemPrompt = `You are an expert agriculture and smart farming assistant. Answer in ${language}. Provide detailed answers with examples, images or links if relevant.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
      max_tokens: 800,
      temperature: 0.7
    }),
  });

  const result = await response.json();
  const reply = result.choices?.[0]?.message?.content || "I could not find an answer.";

  return {
    statusCode: 200,
    body: JSON.stringify({ reply }),
  };
};
