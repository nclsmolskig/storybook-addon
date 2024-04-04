import React from "react";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";
import { TransformComponent } from "react-zoom-pan-pinch";
import { useControls } from "react-zoom-pan-pinch";
import { GraphReturnObject } from "src/scripts/types";

type SvgHandlerProps = { render: GraphReturnObject };

const SvgHandler = ({ render }: SvgHandlerProps) => {
  const controls = useControls();
  const mermaidRef = useRef(null);

  useEffect(() => {
    window.clickCallback = (id: string) => {
      const el: string | HTMLElement = document.querySelector(
        `[data-id="${id}"]`,
      );
      controls.zoomToElement(el);
    };
  }, []);

  useEffect(() => {
    mermaid
      .run()
      .then(() => {
        mermaidRef.current &&
          mermaidRef.current.removeAttribute("data-processed");
      })
      .catch(() => console.error("Mermaid Render Failed"));
  }, [render.value]);

  return (
    <div>
      <button onClick={() => controls.resetTransform()}>Reset</button>

      <TransformComponent
        wrapperStyle={{ width: "100%", padding: 10 }}
        contentStyle={{ width: "100%" }}
      >
        <p className={"mermaid"} style={{ width: "100%" }} ref={mermaidRef}>
          {render.value}
        </p>
      </TransformComponent>
    </div>
  );
};

export default SvgHandler;
