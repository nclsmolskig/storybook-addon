import { name as packageName } from "../../package.json"
export const ADDON_ID = packageName;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PANEL_NAME = `DepGraph`;
export const GRAPH_PARAM_KEY = `dependencyGraph`;
export const uiTypes = {
  mermaid: 'Mermaid'
} as const
export const dataOrigins = {
  npm: 'NPM'
} as const
export const MESSAGES = { //TODO will need to improve messages as we go
  NO_DATA: 'There is NO data to process.',
  NO_UI_AVAILABLE: 'There is NO render available for the provided UI Type and Data'
}