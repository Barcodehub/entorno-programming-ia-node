const axios = require('axios');
const dotenv = require('dotenv');

const languageIds = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54
};

const executeCode = async (language, code) => {
  const languageId = languageIds[language];
  if (!languageId) {
    throw new Error('Unsupported language');
  }

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
      },
      data: {
        language_id: languageId,
        source_code: code,
        stdin: ''
      }
    });

    const token = response.data.token;

    // Esperar y obtener el resultado
    const result = await getSubmissionResult(token);

    return {
      output: result.stdout || '',
      error: result.stderr || result.compile_output || ''
    };
  } catch (error) {
    return { error: error.toString() };
  }
};

const getSubmissionResult = async (token) => {
  const maxAttempts = 10;
  const delayMs = 1000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false&fields=*`,
        headers: {
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
        }
      });

      if (response.data.status.id > 2) { // 1: In Queue, 2: Processing
        return response.data;
      }

      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error) {
      console.error('Error getting submission result:', error);
    }
  }

  throw new Error('Timeout: Execution took too long');
};

module.exports = { executeCode };
