import React from "react";
import { styled } from "@storybook/theming";
import { H1, Link, Code } from "@storybook/components";

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

interface TabContentProps {
  data: any;
}

export const TabContent: React.FC<TabContentProps> = ({ data }) => (
  <TabWrapper>
    <TabInner>
      <Code>{data.id}</Code>
      <Code>{data.source}</Code>
    </TabInner>
  </TabWrapper>
);
