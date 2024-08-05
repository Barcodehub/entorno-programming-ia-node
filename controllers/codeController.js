const CodeSnippet = require('../models/codeSnippet');
const { executeCode } = require('../services/codeExecutionService');
const { getErrorAdvice } = require('../services/openAIService');

exports.executeAndSaveCode = async (req, res) => {
  const { language, code } = req.body;

  try {
    const { output, error } = await executeCode(language, code);
    
    const codeSnippet = new CodeSnippet({
      language,
      code,
      output,
      error
    });

    await codeSnippet.save();

    let advice = null;
    if (error && process.env.USE_OPENAI === 'true') {
      advice = await getErrorAdvice(language, code, error);
    }

    res.json({ output, error, advice });
  } catch (err) {
    console.error('Error in executeAndSaveCode:', err);
    res.status(500).json({ message: 'Error executing code', error: err.toString() });
  }
};