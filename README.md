# Codex Sandbox Clone

Just got my beta key and now I wanna learn by cloning OpenAI's sandbox

## Prerequisites

- node installed
- openai api key

## Setup

Create `.env` file in project root and add:

```env
VITE_OPENAI_API_KEY=yourapikey
```

Enter in your command line termial

```shell
npm install
npm run start
```

## Usage

[OpenAI Completion Docs](https://beta.openai.com/docs/guides/completion)

# TODO

- Implement the history for undo and redo
- Sync caret of code area component from textarea to underlying highlight element
- Show spinner while encoding token count
- Improve settings layout of code area component
- Adjust elements in footer of code area
- Append response in code area