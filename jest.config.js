const testMatchPrefix = process.env.PACKAGE ? `**/packages/${process.env.PACKAGE}/src/**` : '**';
const collectCoveragePrefix = process.env.PACKAGE ? process.env.PACKAGE : '**';

module.exports = {
  // testEnvironment: 'node',
  testMatch:
    process.env.E2E === 'none'
      ? [`${testMatchPrefix}/?*.(spec|test).(j|t)s?(x)`]
      : [`${testMatchPrefix}/?*.(spec|test|e2e).(j|t)s?(x)`],
  testPathIgnorePatterns: ['/.git/', '/node_modules/', '/examples/', '/lib/'],
  collectCoverageFrom: [
    `packages/${collectCoveragePrefix}/src/**/*.{js,jsx,ts,tsx}`,
    '!**/ui.umd.js',
    '!packages/ui/web',
    '!packages/plugin-ui/src/bubble',
    '!**/fixtures/**',
    '!**/__snapshots__/**',
    '!**/ui/**',
    '!**/examples/**',
    '!**/locales/**',
    '!**/typings/**',
    '!**/types/**',
  ],
};
