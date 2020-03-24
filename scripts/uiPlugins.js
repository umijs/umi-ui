const uiPlugins = [
  'packages/preset-ui/src/plugins/dashboard',
  'packages/preset-ui/src/plugins/configuration',
  'packages/plugin-ui-blocks/ui',
  'packages/plugin-ui-tasks/ui',
];

const uiDist = [
  'packages/preset-ui/src/plugins/dashboard/dist/ui.umd.js',
  // 'packages/preset-ui/src/plugins/configuration/dist/ui.umd.js',
  'packages/plugin-ui-tasks/dist/index.umd.js',
  'packages/plugin-ui-blocks/dist/index.umd.js',
  'packages/plugin-ui-blocks/ui/dist/index.umd.js',
  'packages/plugin-ui-tasks/ui/dist/index.umd.js',
  // 'packages/lib/dist/index.umd.js',
  'packages/ui/web/dist/index.html',
];

exports.uiPlugins = uiPlugins;
exports.uiDist = uiDist;
