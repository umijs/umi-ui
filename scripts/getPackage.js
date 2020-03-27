const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = function getPackages() {
  const packagesPath = join(__dirname, '../packages');
  return readdirSync(join(__dirname, '../packages'))
    .filter(pkg => pkg.charAt(0) !== '.')
    .map(repo => {
      const pkgPath = join(packagesPath, repo);
      return {
        pkgPath,
        name: require(require.resolve(join(pkgPath, 'package.json'))).name,

        version: require(require.resolve(join(pkgPath, 'package.json'))).version,
        repo,
      };
    });
};
