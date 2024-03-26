import React, { useEffect, useState } from "react";
import { API, useParameter } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { getGraphRender } from "../scripts/utils"
import { PARAM_KEY } from "../scripts/constants";
import { DepGraphParams } from "../scripts/types";
import { depGraphDefaultParams } from "../scripts/data";

//TODO this section needs to be isolated with the UI render component
import mermaid from 'mermaid';
mermaid.initialize({ startOnLoad: false });

interface PanelProps {
  active: boolean
  api: API
}

function Panel({ active, api }: PanelProps) {
  const currentStoryData = api.getCurrentStoryData()
  const params = useParameter<Partial<DepGraphParams>>(PARAM_KEY, depGraphDefaultParams);
  const normalizedParams = Object.assign(params, depGraphDefaultParams)
  const render = getGraphRender(normalizedParams, currentStoryData)

  useEffect(() => { //TODO this section needs to be isolated with the UI render component
    mermaid.run()
      .then(() => console.log('Mermaid Render Done'))
      .catch(() => console.error('Mermaid Render Failed'));
  }, [render]);

  return (
    <AddonPanel active={active}>
      <div style={{ display: "flex", flexDirection: "column", gap: '8px'  }}>
        <h1> NCLH Dependency Graph Addon</h1>
        <h2> Story ID: { currentStoryData.id }</h2>
        <h2> Story Import Path: { currentStoryData.importPath }</h2>
        {/*TODO Create a component for graph displaying and navigation. Consider conditional components based on UI_Type*/}
        <div style={{ background: "white", color: "black", padding: '16px'  }}>
          <h3> Graph: </h3>
          { render.error
            ? <p> { render.value } </p>
            : <p className={'mermaid'}> { render.value } </p>
          }
        </div>
      </div>
    </AddonPanel>
  );
}

export default Panel;