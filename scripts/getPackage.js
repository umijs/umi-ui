const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = function getPackages() {
  const packagesPath = join(__dirname, '../packages');
  return readdirSync(join(__dirname, '../packages'))
    .filter(pkg => pkg.charAt(0) !== '.')
    .map(repo => ({
      name: require(require.resolve(join(packagesPath, repo, 'package.json'))).name,
      version: require(require.resolve(join(packagesPath, repo, 'package.json'))).version,
      repo,
    }));
};
