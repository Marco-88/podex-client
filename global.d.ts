declare interface ImportMeta {
  env: {
    VITE_OPENAI_API_KEY: string
  }
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.svg?component' {
  const content: string
  export default content
}