import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, TOOL_ID, PANEL_ID, TAB_ID } from "./constants";
import { Tool } from "./Tool/Tool";
import { Panel } from "./Panel/Panel";
import { Tab } from "./Tab/Tab";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, () => {

  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Deps",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
