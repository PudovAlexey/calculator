export const operations: Record<string, (a: number, b: number) => number> = {
    "*": (a, b) => {
      return a * b;
    },
    "/": (a, b) => {
      return a / b;
    },
    "+": (a, b) => {
      return a + b;
    },
    "-": (a, b) => {
      return a - b;
    },
  };