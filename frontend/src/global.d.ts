export {};

declare global {
  interface Window {
    Ecwid?: {
      Cart?: {
        addProduct?: (...args: any[]) => void;
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}
