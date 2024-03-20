import React from "react";
import { addons } from "@storybook/manager-api";
import { Channel } from "diagnostics_channel";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = () => {
  const channel: Channel = addons.getChannel();

  return channel ? <div>{channel.data.storyRendered}</div> : null;
};
