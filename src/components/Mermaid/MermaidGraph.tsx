import React from "react";
import { depGraphDefaultParams } from "src/scripts/data";
import { getGraphRender } from "src/scripts/utils";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { DepGraphParams, GraphReturnObject } from "src/scripts/types";
import SvgHandler from "./SvgHandler";

const MermaidGraph = ({ currentStoryData, dependencyData }: any) => {
  const normalizedParams: DepGraphParams = Object.assign(
    dependencyData,
    depGraphDefaultParams,
  );
  const render: GraphReturnObject = getGraphRender(
    normalizedParams,
    currentStoryData,
  );

  return (
    <div
      style={{
        background: "white",
        color: "black",
        padding: "16px",
        height: "100%",
        width: "100%",
      }}
    >
      {render.error ? (
        <p> {render.value} </p>
      ) : (
        <>
          <TransformWrapper wheel={{ smoothStep: 0.03 }}>
            <SvgHandler render={render} storyId={currentStoryData.id}></SvgHandler>
          </TransformWrapper>
        </>
      )}
    </div>
  );
};

export default MermaidGraph;
