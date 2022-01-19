declare interface ImportMeta {
  env: {
    VITE_OPENAI_API_KEY: string,
    VITE_ENCODER_ADDRESS: string
  }
}

declare module '*.svg' {
  import { SvelteComponent } from 'svelte'
  const content: SvelteComponent
  export default content
}

declare module '*.svg?component' {
  import { SvelteComponent } from 'svelte'
  const content: SvelteComponent
  export default content
}

declare module '*.svg?src' {
  const content: string
  export default content
}

declare module '*.svg?url' {
  const content: string
  export default content
}

declare module 'gpt-3-encoder' {
  export function encode(text: string): number[];

  export function decode(tokens: number[]): string;
}