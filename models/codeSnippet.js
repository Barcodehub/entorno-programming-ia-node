const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  language: String,
  code: String,
  output: String,
  error: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);