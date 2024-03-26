import { DepGraphParams } from "./types";
import { dataOrigins, uiTypes } from "./constants";

export const depGraphDefaultParams:DepGraphParams = {
  uiType: uiTypes.mermaid,
  dataOrigin: dataOrigins.npm
}