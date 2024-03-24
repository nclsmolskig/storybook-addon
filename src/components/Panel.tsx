import React from "react";
import { API, useParameter } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { getGraphRender } from "../scripts/utils"
import { PARAM_KEY } from "../scripts/constants";
import { DepGraphParams } from "../scripts/types";
import { depGraphDefaultParams } from "../scripts/data";

interface PanelProps {
  active: boolean
  api: API
}

function Panel({ active, api }: PanelProps) {
  const currentStoryData = api.getCurrentStoryData()
  const params = useParameter<Partial<DepGraphParams>>(PARAM_KEY, depGraphDefaultParams);
  const normalizedParams = Object.assign(params, depGraphDefaultParams)
  const render = getGraphRender(normalizedParams, currentStoryData)

  return (
    <AddonPanel active={active}>
      <h1> NCLH Dependency Graph Addon</h1>
      <h2> Story ID: { currentStoryData.id }</h2>
      <h2> Story Import Path: { currentStoryData.importPath }</h2>
      <h3> Graph Data </h3>
      { render &&
        <p> { render } </p> //TODO Create a "canvas" component for graph displaying, or conditional components based on UI_Type
      }
    </AddonPanel>
  );
}

export default Panel;