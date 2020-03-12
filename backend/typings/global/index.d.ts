declare global {
  interface PromiseConstructor {
    delay(ms: number): Promise<void>;
  }
}

export { };
