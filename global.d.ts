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

declare module 'gpt-3-encoder' {
  export function encode(text: string): number[];

  export function decode(tokens: number[]): string;
}