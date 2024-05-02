import React from "react";
import { API, useParameter } from "@storybook/manager-api";
import { AddonPanel, P } from "@storybook/components";
import { GRAPH_PARAM_KEY } from "../scripts/constants";
import { DepGraphParams } from "../scripts/types";
import { depGraphDefaultParams } from "../scripts/data";

import MermaidGraph from "./Mermaid/MermaidGraph";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          height: '100%'
        }}
      >
        <MermaidGraph
          currentStoryData={currentStoryData}
          dependencyData={dependencyData}
        ></MermaidGraph>
      </div>
    </AddonPanel>
  );
}

export default Panel;
