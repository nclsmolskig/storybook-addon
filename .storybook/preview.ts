import type { Preview } from "@storybook/react";
import data from "../dependencies.json"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    dependencyGraph:{
      data
    }
  },
};

export default preview;
