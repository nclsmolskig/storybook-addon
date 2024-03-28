import React from "react";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";
import { depGraphDefaultParams } from "src/scripts/data";
import { getGraphRender } from "src/scripts/utils";

const MermaidGraph = ({ currentStoryData, dependencyData }: any) => {
  const normalizedParams = Object.assign(dependencyData, depGraphDefaultParams);
  const render = getGraphRender(normalizedParams, currentStoryData);

  const mermaidRef = useRef(null);

  useEffect(() => {
    //TODO this section needs to be isolated with the UI render component
    mermaid
      .run()
      .then(() => {
        mermaidRef.current &&
          mermaidRef.current.removeAttribute("data-processed");
      })
      .catch(() => console.error("Mermaid Render Failed"));
  }, [render.value]);

  return (
    <div style={{ background: "white", color: "black", padding: "16px" }}>
      <h3> Graph: </h3>
      {render.error ? (
        <p> {render.value} </p>
      ) : (
        <p className={"mermaid"} ref={mermaidRef}>
          {render.value}
        </p>
      )}
    </div>
  );
};

export default MermaidGraph;
