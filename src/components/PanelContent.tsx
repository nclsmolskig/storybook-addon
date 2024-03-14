import React, { Fragment } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button, Code } from "@storybook/components";
import { List } from "./List";

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

const TabInner = styled.div({
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
});

interface PanelContentProps {
  data: any;
}

export const PanelContent: React.FC<PanelContentProps> = ({ data }) => (
  <TabWrapper>
    <TabInner>
      <Code>{data.id}</Code>
      <Code>{data.source}</Code>
    </TabInner>
  </TabWrapper>
);
