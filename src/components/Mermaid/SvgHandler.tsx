import React from "react";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";
import { TransformComponent } from "react-zoom-pan-pinch";
import { useControls } from "react-zoom-pan-pinch";
import { GraphReturnObject } from "src/scripts/types";
import { Button, IconButton } from "@storybook/components";

import { AddIcon, SubtractIcon } from "@storybook/icons";

type SvgHandlerProps = { render: GraphReturnObject; storyId: string };

// this securityLevel is to allow click events to be added on the SVG elements
mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });

const SvgHandler = ({ render, storyId }: SvgHandlerProps) => {
  const controls = useControls();
  const mermaidRef = useRef(null);

  useEffect(() => {
    /**
     The porpuse of this useEffect is to bind the elements needed by the SVG on the browsers DOM
     since the final SVG dont have the ability to use the React's virtual DOM 
    **/

    //TODO: this code binds the clickCallback so the SVG can call it
    window.clickCallback = (id: string) => {
      console.log("test");
      const el: string | HTMLElement = document.querySelector(
        `[data-id="${id}"]`,
      );
      controls.zoomToElement(el);
    };

    //TODO: This should be moved to a separated file
    const styleTag = document.createElement("style");
    styleTag.appendChild(
      document.createTextNode(`.dep-node:hover > rect {
        filter: brightness(.8) !important;
      }`),
    );

    document.head.appendChild(styleTag);
  }, []);

  useEffect(() => {
    mermaid
      .run()
      .then(() => {
        //TODO: this is for forcing mermaids rerender
        mermaidRef.current &&
          mermaidRef.current.removeAttribute("data-processed");
      })
      .catch(() => console.error("Mermaid Render Failed"));
  }, [render.value]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <IconButton variant="solid" onClick={() => controls.zoomOut()}>
            <SubtractIcon></SubtractIcon>
          </IconButton>

          <Button variant="solid" onClick={() => controls.resetTransform()}>
            Reset
          </Button>

          <IconButton variant="solid" onClick={() => controls.zoomIn()}>
            <AddIcon></AddIcon>
          </IconButton>
        </div>
        <div>{storyId}</div>
      </div>

      <TransformComponent
        wrapperStyle={{
          width: "100%",
          height: "100%",
          padding: 10,
          cursor: "grab",
        }}
        contentStyle={{ width: "100%", height: "100%" }}
      >
        <p
          className={"mermaid"}
          style={{ width: "100%", height: "100%" }}
          ref={mermaidRef}
        >
          {render.value}
        </p>
      </TransformComponent>
    </>
  );
};

export default SvgHandler;
