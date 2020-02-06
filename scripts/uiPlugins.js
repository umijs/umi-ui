const uiPlugins = [
  'packages/preset-ui/src/plugins/dashboard',
  'packages/preset-ui/src/plugins/configuration',
];

const uiDist = [
  'packages/preset-ui/src/plugins/dashboard/dist/ui.umd.js',
  'packages/preset-ui/src/plugins/configuration/dist/ui.umd.js',
  'packages/plugin-ui-tasks/dist/index.umd.js',
  'packages/plugin-ui-blocks/dist/index.umd.js',
  'packages/ui/dist/index.umd.js',
  'packages/ui/client/dist/index.html',
];

exports.uiPlugins = uiPlugins;
exports.uiDist = uiDist;
