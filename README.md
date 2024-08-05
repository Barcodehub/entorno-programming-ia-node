# Code Execution API

This project is a Node.js application that uses the Judge0 API to execute code in various programming languages. The application sends the source code to the API, waits for it to be processed, and then retrieves the result.

## Features

- Support for multiple programming languages: JavaScript, Python, Java, and C++.
- Submission and execution of source code via the Judge0 API.
- Error handling and timeout for API requests.
- -Incorporation of OpenAI for handling corrections (BETA).

## Requirements

- Node.js
- npm (Node Package Manager)
- A RapidAPI account with access to the Judge0 API

## Installation

1. Install the dependencies:

    ```bash
    npm install
    ```

2. Create a `.env` file in the root directory and add your RapidAPI key:

    ```plaintext
    MONGODB_URI=your-uri-mongodb
    OPENAI_API_KEY=your_openai_api_key
    USE_OPENAI=false
    PORT=3000
    RAPIDAPI_KEY=YOUR_API_KEY_HERE
    ```


### Example Usage

POST
`http://localhost:3000/api/code/execute`

body:
```
{
  "language": "javascript",
  "code": "console.log('Hello from JavaScript!');"
}
```
response:
```
{
    "output": "Hello, World!\n",
    "error": "",
    "advice": null
}
```
