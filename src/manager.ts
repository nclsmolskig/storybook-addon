import { addons, types } from '@storybook/manager-api';
import Panel from './components/Panel';
import Title from './components/Title';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from "./scripts/constants";

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: Title,
    match: ({ viewMode }) => viewMode === "story",
    paramKey: PARAM_KEY,
    render: ({ active }) => {
      return active && api.getCurrentStoryData()
      ? Panel({active, api})
      : null
    },
  });
});
