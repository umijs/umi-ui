const { execa } = require('@umijs/utils');
const { join } = require('path');
const getPackage = require('./getPackage');

process.setMaxListeners(Infinity);

module.exports = function() {
  const pkgs = getPackage().map(pkg => pkg.name);
  const commands = pkgs.map(pkg => {
    const subprocess = execa('tnpm', ['sync', pkg]);
    subprocess.stdout.pipe(process.stdout);
    return subprocess;
  });
  Promise.all(commands);
};
