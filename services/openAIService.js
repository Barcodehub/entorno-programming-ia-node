const OpenAI = require('openai');

let openai;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const getErrorAdvice = async (language, code, error) => {
  if (!openai) {
    console.error('OpenAI API key not configured');
    return "OpenAI integration is not available.";
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful coding assistant." },
        { role: "user", content: `I have an error in my ${language} code. Here's the code:\n\n${code}\n\nAnd here's the error:\n\n${error}\n\nCan you explain what might be causing this error and how to fix it?` }
      ],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting advice from OpenAI:', error);
    return "Sorry, I couldn't generate advice at this time.";
  }
};

module.exports = { getErrorAdvice };