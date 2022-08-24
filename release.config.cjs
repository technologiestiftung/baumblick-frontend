module.exports = {
  branches: [{ name: 'main' }, { name: 'staging', prerelease: true }],
  npmPublish: false,
  dryRun: false,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
}
