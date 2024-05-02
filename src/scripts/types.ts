import { dataOrigins, uiTypes } from "./constants";

export type UIType = (typeof uiTypes)[keyof typeof uiTypes];
export type DataOrigin = (typeof dataOrigins)[keyof typeof dataOrigins];
export type DependencyGraph = Map<string, Set<string>>;
export interface NpmPackage {
  version: string;
  resolved?: string;
  overridden?: boolean;
  dependencies?: {
    [packageName: string]: NpmPackage;
  };
}
export interface DepGraphParams {
  uiType?: UIType;
  dataOrigin?: DataOrigin;
  data?: NpmPackage; //TODO Here we can add different types of data TBD
  config?: {
    include: string; //TODO consider support for string[] as well, similar to exclude below
    exclude: string | string[];
  };
}

export interface GraphReturnObject {
  value: string;
  error: boolean;
}
