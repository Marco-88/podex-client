# Codex Sandbox Clone

Just got my beta key and now I wanna learn by cloning OpenAI's sandbox

## Prerequisites

- `node` installed
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

- Format token counter tooltips
- Rethink counters and refactor TokenCounter component
- Separate code store for playground, but add last sandbox code block into code area
- Debug removal of all code block - canvas stays in iframe