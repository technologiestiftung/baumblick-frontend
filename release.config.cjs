module.exports = {
  extends: '@technologiestiftung/semantic-release-config',
  branches: [
    { name: 'main' },
    { name: 'staging', prerelease: true }, // `prerelease` is built with the template `${name.replace(/^pre\\//g, "")}`
  ],
  plugins: [
    [
      '@saithodev/semantic-release-backmerge',
      {
        branch: ['staging'],
        backmergeStrategy: 'merge',
      },
    ],
  ],
}
