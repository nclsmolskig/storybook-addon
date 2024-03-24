import React from "react";
import { Badge, Spaced } from "@storybook/components";
import { PANEL_NAME } from "../scripts/constants";

function Title(dependencies?: number, dependents?: number) {
  const down = dependencies > 0 ? <Badge status="positive">{dependencies}</Badge> : '';
  const up = dependents > 0 ? <Badge status="warning">{dependents}</Badge> : '';

  return (
    <div>
      <Spaced col={1}>
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{PANEL_NAME}</span>
        {down}
        {up}
      </Spaced>
    </div>
  );
}

export default Title