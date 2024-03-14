import React from "react";
import { useParameter, addons } from "@storybook/manager-api";
import { PARAM_KEY } from "../constants";
import { TabContent } from "../components/TabContent";

interface TabProps {
  active: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useparameter
  const channel = addons.getChannel();

  const componentData = channel.data["storybook/docs/snippet-rendered"][0];
  return active ? <TabContent data={componentData}></TabContent> : null;
};
