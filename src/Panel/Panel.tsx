import React from "react";
import { addons, useAddonState, useChannel } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "../constants";
import { PanelContent } from "../components/PanelContent";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = () => {
  const channel = addons.getChannel();
  const componentData = channel.data["storybook/docs/snippet-rendered"][0];


  return <PanelContent data={componentData}></PanelContent>;
};
