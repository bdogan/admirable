import { Screen } from "../Engine/Screen";

declare module "*.png" {
  const content: any;
  export default content;
}

declare const ada: Screen;
