import React from 'react';
import { useParameter } from '@storybook/api';
import { addons } from "@storybook/manager-api";
import { Channel } from "diagnostics_channel";

const PARAM_KEY = 'componentPath';

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const channel: Channel = addons.getChannel();
  const componentPath = useParameter<string>(PARAM_KEY, null);

  if (active && componentPath) {
    return <div>Component Path: {componentPath} {channel ? <div>Channel: {channel.data.storyRendered}</div> : null}</div>;
  }

  return null;
};
