const { execSync } = require('child_process');
const pkg = require('@root/package.json');

const getGitVersion = () => {
  try {
    return execSync('git describe --tags --abbrev=4', { stdio: 'pipe' }).toString().trim();
  } catch (err) {
    return false;
  }
};

module.exports = getGitVersion() || pkg.version;
