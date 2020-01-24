const uiPlugins = [
  "packages/plugin-ui/src/plugins/dashboard",
  "packages/plugin-ui/src/plugins/configuration",
  "packages/plugin-ui-tasks/src",
  "packages/ui/ui"
];

const uiDist = [
  "packages/plugin-ui/src/plugins/dashboard/dist/ui.umd.js",
  "packages/plugin-ui/src/plugins/configuration/dist/ui.umd.js",
  "packages/plugin-ui-tasks/src/dist/ui.umd.js",
  "packages/ui/ui/dist/ui.umd.js",
  "packages/ui/client/dist/index.html"
];

exports.uiPlugins = uiPlugins;
exports.uiDist = uiDist;
