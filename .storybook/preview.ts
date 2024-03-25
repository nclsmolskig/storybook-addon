import type { Preview } from "@storybook/react";
import data from "../dependencies.json"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    dependencyGraph:{
      data,
      config: {
        include: 'storybook'
      }
    }
  },
};

export default preview;
