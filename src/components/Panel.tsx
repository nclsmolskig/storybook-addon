import React from "react";
import { API, useParameter } from "@storybook/manager-api";
import { AddonPanel, P } from "@storybook/components";
import { GRAPH_PARAM_KEY } from "../scripts/constants";
import { DepGraphParams } from "../scripts/types";
import { depGraphDefaultParams } from "../scripts/data";

//TODO this section needs to be isolated with the UI render component
import mermaid from "mermaid";
import MermaidGraph from "./Mermaid/MermaidGraph";

mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
interface PanelProps {
  active: boolean;
  api: API;
}

function Panel({ active, api }: PanelProps) {
  const dependencyData = useParameter<Partial<DepGraphParams>>(
    GRAPH_PARAM_KEY,
    depGraphDefaultParams,
  );
  const currentStoryData = api.getCurrentStoryData();

  return (
    <AddonPanel active={active}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h1> NCLH Dependency Graph Addon</h1>
        <h2> Story ID: {currentStoryData.id}</h2>
        <h2> Story Import Path: {currentStoryData.importPath}</h2>
        <MermaidGraph
          currentStoryData={currentStoryData}
          dependencyData={dependencyData}
        ></MermaidGraph>
      </div>
    </AddonPanel>
  );
}

export default Panel;
